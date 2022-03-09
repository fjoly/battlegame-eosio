import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {UserService} from "./user.service";
import {UserType} from "./user.type";
import {RenameUserInput} from "./rename-user.input";

@Resolver()
export class UserResolver {

    constructor(private gameService:UserService) {}

    @Query(returns => [UserType])
    games() {
        return this.gameService.getUsers();
    }

    @Query(returns => [UserType])
    gameScoreBoard() {
        return this.gameService.getGamesScoreboard();
    }

    @Query(returns => UserType)
    game(
        @Args('accountName') accountName: string,
    ) {
        return this.gameService.getUser(accountName);
    }

    @Mutation((returns) => UserType)
    renameUserName(
        @Args('renameUserName') renameUsernameInput: RenameUserInput,
    ) {
        return this.gameService.renameUser(renameUsernameInput);
    }

}