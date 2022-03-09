import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {SingleUserScoreBoardType} from "../../model/single-user-score-board.type";
import {getScoreBoard} from "../../services/back-end.api";


/*
    Description of load scoreboard action
 */

//Description action load scoreboard request
export const LOAD_SCORE_BOARD_REQUEST = "game/load_score_board_request";
export type LoadScoreBoardRequestAction = Action<typeof LOAD_SCORE_BOARD_REQUEST>

//Description action load scoreboard success
export const LOAD_SCORE_BOARD_SUCCESS = "game/load_score_board_success";
export interface LoadScoreBoardSuccessAction extends Action<typeof LOAD_SCORE_BOARD_SUCCESS> {
    payload: {
        data: SingleUserScoreBoardType[]
    }
}

//Description action load scoreboard fail
export const LOAD_SCORE_BOARD_FAIL = "game/load_score_board_fail";
export interface LoadScoreBoardFailAction extends Action<typeof LOAD_SCORE_BOARD_FAIL> {
    errorMessage: string;
}

/*
    Description of load scoreboard event
 */

export const loadScoreBoardEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoadScoreBoardRequestAction | LoadScoreBoardSuccessAction | LoadScoreBoardFailAction> =>
    async (dispatch) => {
        dispatch({
            type: LOAD_SCORE_BOARD_REQUEST
        });
        try {
            //Call Backend api
            const scoreBoardData = await getScoreBoard();
            //If no error dispatch success event
            dispatch({
                type: LOAD_SCORE_BOARD_SUCCESS,
                payload: {
                    data : scoreBoardData
                }
            });
        } catch (e:any) {
            //If error dispatch fail event
            dispatch({
                type: LOAD_SCORE_BOARD_FAIL,
                errorMessage: e.message
            });
        }
}
