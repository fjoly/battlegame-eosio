import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {v4 as uuid} from 'uuid';
import {UserEntity} from "./user.entity";
import {RenameUserInput} from "./rename-user.input";
import {Cron} from "@nestjs/schedule";
import {JsonRpc} from "eosjs";
import {GetTableRowsResult} from "eosjs/dist/eosjs-rpc-interfaces";
import {ConfigService} from "@nestjs/config";
import 'dotenv/config';
const fetch = require('node-fetch');

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, private configService:ConfigService
    ) {}

    network = {
        protocol: "https",
        host: this.configService.get('EOS_HTTP_ENDPOINT'),
        port: 443,
    }

    rpc = new JsonRpc(this.network.protocol + '://' +this.network.host + ':' + this.network.port,{fetch});

    // Create a new game information link to an account
    async createUser(renameUsernameInput:RenameUserInput): Promise<UserEntity> {
        //GetInformation from the blockChain
        const userEntity:Omit<UserEntity,'id' |'userName'> = await this.getUserFromEosBlockChain(renameUsernameInput.accountName);
        //Get information from the mongoDb
        const user = this.userRepository.create({
            id: uuid(),
            accountName: userEntity.accountName,
            userName: renameUsernameInput.userName,
            winCount: userEntity.winCount,
            lostCount:userEntity.lostCount,
            ratio: (userEntity.ratio)
        });
        return this.userRepository.save(user);
    }

    //Get All games info from repository
    async getUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
    //Get top 10 des gamers by ratio w/l
    async getGamesScoreboard(): Promise<UserEntity[]> {
        //Get Games order by ratio with 10 result limit
        return await this.userRepository.find({
            order: {
                ratio: "ASC",
            },
            take: 10
        })
    }

    //Update informations from blockchain once per minute
    // Not performant, the good way to do it can be, add some data to the smart contract to know if users
    //information change and update if it's the case.
    @Cron('0 * * * * *')
    async updateGamesStatus():Promise<void> {
        const mongoUserData = await this.getUsers();
        const eosUserData = await this.getUsersFromEosBlockChain();
        await eosUserData.forEach(async (eosGamesData) => {
                const mongoData = mongoUserData.find((mongoGameData) => {
                    return mongoGameData.accountName === eosGamesData.accountName;
                });
                if (mongoData === undefined) {
                    await this.createUser({accountName: eosGamesData.accountName, userName: eosGamesData.accountName});
                } else {
                    await this.updateEntityFromEos(eosGamesData, mongoData);
                }
            }
        );
    }

    //Get a game info for a specific user
    async getUser(accountName: string): Promise<UserEntity> {
        //Find the game info link to the user accountName
        return this.userRepository.findOne({ accountName:accountName });
    }

    async updateEntityFromEos(eosUserEntity:Omit<UserEntity,'id' |'userName'>, mongoUserEntity:UserEntity):Promise<UserEntity>{
        const newUser:UserEntity = {
            id: mongoUserEntity.id,
            accountName:eosUserEntity.accountName,
            userName:mongoUserEntity.userName,
            winCount:eosUserEntity.winCount,
            lostCount:eosUserEntity.lostCount,
            ratio: (eosUserEntity.winCount/eosUserEntity.lostCount)
        }
        return await this.userRepository.save(newUser);
    }

    //Functionality of renaming a User.
    async renameUser(renameUserInput:RenameUserInput): Promise<UserEntity> {
        const userData:UserEntity = await this.getUser(renameUserInput.accountName );
        //If gamer info not exist create one
        if(userData === undefined){
            return await this.createUser(renameUserInput);
        } else {
            const newGameInfo:UserEntity = {
                id: userData.id,
                accountName:userData.accountName,
                userName:renameUserInput.userName,
                winCount:userData.winCount,
                lostCount:userData.lostCount,
                ratio: userData.ratio
            }
            return await this.userRepository.save(newGameInfo);
        }
    }

    //Get all games from EOS blockchain
    async getUsersFromEosBlockChain() : Promise<Omit<UserEntity,'id' |'userName'>[]> {
        const userData =  await this.rpc.get_table_rows({
            "json": true,
            "code": this.configService.get('EOS_CONTRACT_NAME'),    // contract who owns the table
            "scope": this.configService.get('EOS_CONTRACT_NAME'),   // scope of the table
            "table": "users",    // name of the table as specified by the contract abi
        });
        return this.convertUsersDataFromEosBlockChain(userData);
    }

    //Get specific game from EOS blockchain
    async getUserFromEosBlockChain(accountName:string) : Promise<Omit<UserEntity,'id' |'userName'>> {
        const userData:GetTableRowsResult = await this.rpc.get_table_rows({
                "json": true,
                "code": this.configService.get('EOS_CONTRACT_NAME'),    // contract who owns the table
                "scope": this.configService.get('EOS_CONTRACT_NAME'),   // scope of the table
                "table": "users",    // name of the table as specified by the contract abi
                "limit": 1,
                "lower_bound": accountName
            });
        return this.convertUserDataFromEosBlockChain(userData.rows[0]);
    }

    //Convert Data from blockchain into UserEntity
    convertUsersDataFromEosBlockChain(userData:GetTableRowsResult):Omit<UserEntity,'id' |'userName'>[] {
        let usersData:Omit<UserEntity,'id' |'userName'>[] = [];
        userData.rows.forEach((gameData) => {
            usersData.push(this.convertUserDataFromEosBlockChain(gameData));
        });
        return usersData;
    }

    //Convert Data from blockchain into UserEntity
    convertUserDataFromEosBlockChain(gameData:any):Omit<UserEntity,'id' |'userName'> {
        return {
            accountName: gameData.username,
            winCount: gameData.win_count,
            lostCount: gameData.lost_count,
            ratio: (gameData.win_count / gameData.lost_count)
        };
    }
}

