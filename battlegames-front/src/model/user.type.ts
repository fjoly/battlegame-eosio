//Description of userState
import {EosGameType} from "./eos-game.type";

export interface UserType {
    accountName: string;
    userName: string;
    win_count: number;
    lost_count: number;
    game_data: EosGameType | null;
    isLoading: boolean,
    errorMessage: string,
    isOnError: boolean,
}

export interface UserNameType {
    username : string
}

export interface RenameUserType {
    userName : string,
    accountName: string
}