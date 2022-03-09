import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getGameData, startGame} from "../../services/eos-game.api";
import {UserType} from "../../model/user.type";


/*
    Description of user start game actions
 */

//Description action user start game request
export const START_GAME_REQUEST = "game/start_request";
export type GameStartRequestAction = Action<typeof START_GAME_REQUEST>

//Description action user start game success
export const START_GAME_SUCCESS = "game/start_success";
export interface GameStartSuccessAction extends Action<typeof START_GAME_SUCCESS> {
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Description action user start game fail
export const START_GAME_FAIL = "game/start_fail";
export interface GameStartFailAction extends Action<typeof START_GAME_FAIL> {
    errorMessage: string;
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

/*
    Description of user login event
 */

export const gameStartEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    GameStartRequestAction | GameStartSuccessAction | GameStartFailAction> =>
    async (dispatch) => {
        dispatch({
            type: START_GAME_REQUEST
        });
        try {
            //Action de connexion
            const gameInfo = await startGame();
            //If no error dispatch success event
            dispatch({
                type: START_GAME_SUCCESS,
                payload: gameInfo
            });
        } catch (e:any) {
            //If  error dispatch fail event
            const gameData =  await getGameData();
            dispatch({
                type: START_GAME_FAIL,
                errorMessage: e.message,
                payload: gameData
            });
        }
}
