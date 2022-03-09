import {RootState} from "../store/store";
import {ScoreBoardType} from "../model/single-user-score-board.type";
import {
    LOAD_SCORE_BOARD_FAIL,
    LOAD_SCORE_BOARD_REQUEST,
    LOAD_SCORE_BOARD_SUCCESS,
    LoadScoreBoardFailAction,
    LoadScoreBoardRequestAction,
    LoadScoreBoardSuccessAction
} from "../actions/scoreBoard/load-score-board";
import {
    RENAME_USER_FAIL,
    RENAME_USER_REQUEST,
    RENAME_USER_SUCCESS, RenameUserFailAction, RenameUserRequestAction,
    RenameUserSuccessAction
} from "../actions/user/rename-action";

/**
 *  Reducer for Score Board Data handle : load score board action and after rename action
 *  Handle Sucess and return the proper state
 *  Handle Fail and return the error
 *  Handle Request and mark state as isLoading mode
 */

//Initial State
const initialState: ScoreBoardType = {
    isLoading: false,
    data : [],
    isOnError: false,
    errorMessage: '',
}


//Selector for scoreBoardState
export const selectScoreBoardState = (rootState: RootState) => {
    return rootState.scoreBoard
}

//Reducer for score board action
const scoreBoardReducer = (
    state: ScoreBoardType = initialState,
    action: LoadScoreBoardRequestAction |
        LoadScoreBoardSuccessAction |
        LoadScoreBoardFailAction |
        RenameUserSuccessAction |
        RenameUserFailAction |
        RenameUserRequestAction
) => {
    //If Rename or load score board success refresh data.
    if(action.type === LOAD_SCORE_BOARD_SUCCESS || action.type === RENAME_USER_SUCCESS) {
        const playersScoreBoard = action.payload;
        return {
            ...state,
            data: playersScoreBoard.data,
            isLoading: false,
            errorMessage: "",
            error: false
        };
    }
    //If Rename or load score board request isLoading flag to true
    if(action.type === LOAD_SCORE_BOARD_REQUEST || action.type === RENAME_USER_REQUEST){
        return {
            ...state,
            isLoading: true,
            error: false,
            errorMessage: "",
        };
    }
    //If Rename or load score board fail fill errorMessage field
    if(action.type ===  LOAD_SCORE_BOARD_FAIL || action.type === RENAME_USER_FAIL){
        return {
            ...state,
            error: true,
            isLoading: false,
            error_message: action.errorMessage
        };
    }
    else return state;
}

export default scoreBoardReducer;