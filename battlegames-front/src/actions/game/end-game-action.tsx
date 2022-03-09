import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {endGame, getGameData} from "../../services/eos-game.api";
import {UserType} from "../../model/user.type";

/*
    Description of end game action
 */

//Description action end game request
export const END_GAME_REQUEST = "game/end_game_request";
export type EndGameRequestAction = Action<typeof END_GAME_REQUEST>

//Description action end game success
export const END_GAME_SUCCESS = "game/end_game_success";
export interface EndGameSuccessAction extends Action<typeof END_GAME_SUCCESS> {
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Description action end game fail request
export const END_GAME_FAIL = "game/end_game_fail";
export interface EndGameFailAction extends Action<typeof END_GAME_FAIL> {
    errorMessage: string;
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Handle Action of type end game event
export const endGameEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    EndGameRequestAction | EndGameSuccessAction | EndGameFailAction> =>
    async (dispatch) => {
        dispatch({
            type: END_GAME_REQUEST
        });
        try {
            //Call service eos game api
            const gameData=  await endGame();
            //If no error dispatch success
            dispatch({
                type: END_GAME_SUCCESS,
                payload: gameData
            });
        } catch (e:any) {
            const gameData =  await getGameData();
            //If error dispatch fail
            dispatch({
                type: END_GAME_FAIL,
                errorMessage: e.message,
                payload: gameData
            });
        }
}
