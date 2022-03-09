import {RootState} from "../store/store";
import {UserType} from "../model/user.type";
import {
    GameStartFailAction,
    GameStartRequestAction,
    GameStartSuccessAction,
    START_GAME_FAIL,
    START_GAME_REQUEST,
    START_GAME_SUCCESS
} from "../actions/game/start-game-action";
import {
    PLAY_CARD_FAIL,
    PLAY_CARD_REQUEST,
    PLAY_CARD_SUCCESS,
    PlayCardFailAction,
    PlayCardRequestAction,
    PlayCardSuccessAction
} from "../actions/game/play-card-action";
import {
    END_GAME_FAIL,
    END_GAME_REQUEST,
    END_GAME_SUCCESS,
    EndGameFailAction,
    EndGameRequestAction,
    EndGameSuccessAction
} from "../actions/game/end-game-action";
import {
    NEXT_ROUND_FAIL,
    NEXT_ROUND_REQUEST,
    NEXT_ROUND_SUCCESS,
    NextRoundFailAction,
    NextRoundRequestAction,
    NextRoundSuccessAction
} from "../actions/game/next-round-action";
import {
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LoginUserFailAction,
    LoginUserRequestAction,
    LoginUserSuccessAction
} from "../actions/user/login-action";
import {
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LogoutUserFailAction,
    LogoutUserRequestAction,
    LogoutUserSuccessAction
} from "../actions/user/logout-action";
import {
    RENAME_USER_FAIL,
    RENAME_USER_REQUEST,
    RENAME_USER_SUCCESS,
    RenameUserFailAction,
    RenameUserRequestAction,
    RenameUserSuccessAction
} from "../actions/user/rename-action";

/**
 *  Reducer for User Action : Login / StartGame / PlayCard / NextRound / EndGame / Logout
 *  Handle Sucess and return the proper state
 *  Handle Fail and return the error
 *  Handle Request and mark state as isLoading mode
 */


//Initial State
const initialState: UserType = {
    accountName:"",
    userName: "",
    win_count: 0,
    lost_count: 0,
    game_data: null,
    isLoading: false,
    errorMessage: "",
    isOnError:false,
}

//Selector for userState
export const selectUserGameState = (rootState: RootState) => {
    return rootState.userGame
}

//Reducer
const userGameReducer = (
    state: UserType = initialState,
    action: LoginUserSuccessAction |
        LoginUserRequestAction |
        LoginUserFailAction |
        GameStartSuccessAction |
        GameStartRequestAction |
        GameStartFailAction |
        PlayCardSuccessAction |
        PlayCardRequestAction |
        PlayCardFailAction |
        EndGameSuccessAction |
        EndGameRequestAction |
        EndGameFailAction |
        NextRoundSuccessAction |
        NextRoundRequestAction |
        NextRoundFailAction |
        LogoutUserRequestAction |
        LogoutUserFailAction |
        LogoutUserSuccessAction |
        RenameUserRequestAction |
        RenameUserFailAction |
        RenameUserSuccessAction
) => {
    //If log in sucess update all field
    if(action.type === LOGIN_USER_SUCCESS ) {
        const userPayload= action.payload;
        return {
            ...state,
            accountName: userPayload.accountName,
            userName: userPayload.userName,
            win_count: userPayload.win_count,
            lost_count:userPayload.lost_count,
            game_data: userPayload.game_data,
            errorMessage:"",
            isOnError:false,
            isLoading: false
        };
    }
    //If rename success update userName field
    if(action.type === RENAME_USER_SUCCESS) {
        const userPayload= action.payload;
        return {
            ...state,
            userName: userPayload.username,
            isLoading: false,
            errorMessage:"",
            isOnError:false,
        };
    }
    //If endGame success update all field (without userName not neccessary)
    if(action.type === END_GAME_SUCCESS) {
        const userPayload= action.payload;
        return {
            ...state,
            accountName: userPayload.accountName,
            win_count: userPayload.win_count,
            lost_count:userPayload.lost_count,
            game_data: userPayload.game_data,
            errorMessage:"",
            isOnError:false,
            isLoading: false
        };
    }
    //If PlayCard success update gameData field
    if (action.type === PLAY_CARD_SUCCESS || action.type === NEXT_ROUND_SUCCESS  || action.type === START_GAME_SUCCESS){
        const startGame= action.payload;
        return {
            ...state,
            game_data: startGame.game_data,
            isLoading: false,
            errorMessage:"",
            isOnError:false,
        };
    }
    //If action of type request, set isLoading to true
    if(action.type === LOGIN_USER_REQUEST || action.type === PLAY_CARD_REQUEST || action.type === NEXT_ROUND_REQUEST || action.type === START_GAME_REQUEST  || action.type === END_GAME_REQUEST || action.type === LOGOUT_USER_REQUEST || action.type === RENAME_USER_REQUEST){
        return {
            ...state,
            isLoading: true,
            errorMessage:"",
            isOnError: false,
        };
    }
    //If action of type fail, set errorMessage field
    if( action.type === PLAY_CARD_FAIL  || action.type === LOGIN_USER_FAIL || action.type === NEXT_ROUND_FAIL || action.type === END_GAME_FAIL || action.type === START_GAME_FAIL ){
        return {
            ...state,
            isOnError: true,
            isLoading: false,
            errorMessage: action.errorMessage,
            game_data: action.payload.game_data,
        };
    }
    //If action of type fail, set errorMessage field
    if( action.type === LOGOUT_USER_FAIL || action.type === RENAME_USER_FAIL){
        return {
            ...state,
            isOnError: true,
            isLoading: false,
            errorMessage: action.errorMessage
        };
    }
    //If logout success return to initial State
    if (action.type === LOGOUT_USER_SUCCESS){
        return  initialState;
    }
    else{
        //For other actions return the state
        return state;
    }
}

export default userGameReducer;