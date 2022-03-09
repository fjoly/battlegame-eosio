import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getGameData, nextRound} from "../../services/eos-game.api";
import {UserType} from "../../model/user.type";


/*
    Description of user nextround event
 */

//Description action user nextround request
export const NEXT_ROUND_REQUEST = "game/next_round_request";
export type NextRoundRequestAction = Action<typeof NEXT_ROUND_REQUEST>

//Description action user nextround success
export const NEXT_ROUND_SUCCESS = "game/next_round_success";
export interface NextRoundSuccessAction extends Action<typeof NEXT_ROUND_SUCCESS> {
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Description action user nextround fail
export const NEXT_ROUND_FAIL = "game/next_round_fail";
export interface NextRoundFailAction extends Action<typeof NEXT_ROUND_FAIL> {
    errorMessage: string;
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Description of steps for nextRoundEvent action
export const nextRoundEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    NextRoundRequestAction | NextRoundSuccessAction | NextRoundFailAction> =>
    async (dispatch) => {
    //Start with dispatch REQUEST
        dispatch({
            type: NEXT_ROUND_REQUEST
        });
        try {
            //Call nextRound function from eos api
             const gameData = await nextRound();
             //If no error dispatch success event
            dispatch({
                type: NEXT_ROUND_SUCCESS,
                payload: gameData
            });
        } catch (e:any) {
            //If  error dispatch fail event
            const gameData =  await getGameData();
            dispatch({
                type: NEXT_ROUND_FAIL,
                errorMessage: e.message,
                payload: gameData
            });
        }
}
