import {UserNameType, UserType} from "../model/user.type";
import {hexToUint8Array} from 'eosjs/dist/eosjs-serialize';
import {PlayCardType} from "../model/eos-game.type";
import {EOSClient} from "../client/eos-client.js"

/*
 Function Handling action selected by user. Based on EOSClient class
 */

//Interface for loading config file
export interface Config
{
    "eos_contract_name": string,
    "eos_http_endpoint": string,
    "eos_chain_id" : string
}
// Create new EOSCLient
const eosClient: EOSClient = new EOSClient()

//Login into game function
export const login = async ():Promise<Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {
    try {
        //Connect with scatter
        await eosClient.connect();
        //Login with scatter
        const account = await eosClient.login()
        //Get the accountName
        const userName:UserNameType = {
            username: account.name
        }
        //Push login action into Game contract
        await eosClient.transact(userName, "login")
        //Get user game data
        const data = await eosClient.getGameData();
        //Convert it and return user Game data
        return convertGameData(data.rows[0]);
    } catch (error) {
        throw (error)
    }
}
//Start a new game function
export const startGame = async ():Promise<Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {

    try {
        //If no account found log the user
        if(eosClient.getAccount() == null){
            await login();
        }
        //Get the EOS account Name
        const userName:UserNameType = {
            username: eosClient.getAccount().name
        }
        //Push startgame action into EOS testnet
        await eosClient.transact(userName,"startgame");
        const data = await eosClient.getGameData();
        //Return converted data
        return convertGameData(data.rows[0]);
    } catch (error) {
        throw (error)
    }
}
//Play a card game function
export const playCard = async (player_card_index:number):Promise<Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {
    try {
        //If no account found log the user
        if(eosClient.getAccount() == null){
            await login();
        }
        //Prepare play card game data for testnet
        const playCardData: PlayCardType = {
            username : eosClient.getAccount().name,
            player_card_idx : player_card_index,
        }
        //Push playcard action into eos testnet
        await eosClient.transact(playCardData,"playcard");
        //Get user data and return converted user Data
        const data = await eosClient.getGameData();
        return convertGameData(data.rows[0]);
    } catch (error) {
        throw (error)
    }
}
//Next round game function
export const  nextRound= async ():Promise<Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {
    try {
        //If no account found log the user
        if(eosClient.getAccount() == null){
            await login();
        }
        //Prepare action data
        const userName:UserNameType = {
            username: eosClient.getAccount().name
        }
        //Push nextround action
        await eosClient.transact(userName,"nextround");
        //Get user data and return converted user Data
        const data = await eosClient.getGameData();
        return convertGameData(data.rows[0]);
    } catch (error){
        throw (error)
    }
}
//End game function
export const endGame= async ():Promise<Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {

    try {
        //If no account found log the user
        if(eosClient.getAccount() == null){
            await login();
        }
        //Prepare action data
        const userName:UserNameType = {
            username: eosClient.getAccount().name
        }
        //Push endgame action
        await eosClient.transact(userName,"endgame");
        //Get user data and return converted user Data
        const data = await eosClient.getGameData();
        return convertGameData(data.rows[0]);
    } catch (error){
        throw (error);
    }
}
//Function for refresh game data
export const getGameData =  async ():Promise<Omit<UserType, 'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>> => {
    //Get user data and return converted user Data
    const data = await eosClient.getGameData();
    return convertGameData(data.rows[0]);
}
//Logout scatter function
export const logout = async () => {
    try {
        await eosClient.logout();

    } catch (error) {
        throw error;
    }
}

//Function handling conversion from testnet data into UserType
const convertGameData = (data:any):Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'> => {
    return {
        accountName: data.username,
        win_count: data.win_count,
        lost_count: data.lost_count,
        game_data: {
            selected_card_player: data.game_data?.selected_card_player,
            hand_ai: Array.from(hexToUint8Array(data.game_data?.hand_ai)),
            deck_player: Array.from(hexToUint8Array(data.game_data?.deck_player)),
            life_player: data.game_data?.life_player,
            life_ai: data.game_data?.life_ai,
            hand_player: Array.from(hexToUint8Array(data.game_data?.hand_player)),
            deck_ai: Array.from(hexToUint8Array(data.game_data?.deck_ai)),
            life_lost_ai: data.game_data?.life_lost_ai,
            life_lost_player: data.game_data?.life_lost_player,
            selected_card_ai: data.game_data?.selected_card_ai,
            status: data.game_data?.status,
        }
    };
}