import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getScoreBoard, renameUser} from "../../services/back-end.api";
import {SingleUserScoreBoardType} from "../../model/single-user-score-board.type";


/*
    Description of user rename actions
 */

//Description action user rename request
export const RENAME_USER_REQUEST = "user/rename_request";
export type RenameUserRequestAction = Action<typeof RENAME_USER_REQUEST>

//Description action user rename success
export const RENAME_USER_SUCCESS = "user/rename_success";
export interface RenameUserSuccessAction extends Action<typeof RENAME_USER_SUCCESS> {
    payload: {
        username: string
        data: SingleUserScoreBoardType[]
    }
}

//Description action user rename fail
export const RENAME_USER_FAIL = "user/rename_fail";
export interface RenameUserFailAction extends Action<typeof RENAME_USER_FAIL> {
    errorMessage: string;
}

/*
    Description of user rename event
 */

export const renameUserEvent = (accountName:string,userName:string): ThunkAction<
    void,
    RootState,
    undefined,
    RenameUserRequestAction | RenameUserSuccessAction | RenameUserFailAction> =>
    async (dispatch) => {
        //Start by dispatching user rename request
        dispatch({
            type: RENAME_USER_REQUEST
        });
        try {
            //Attempt to rename user
            const result = await renameUser(accountName,userName);
            //If user succeed to rename you have to refresh scoreboard because maybe user data in it are outdated
            const scoreBoardData = await getScoreBoard();
            //If no error dispatch success event
            dispatch({
                type: RENAME_USER_SUCCESS,
                payload:{
                    username: result.userName,
                    data: scoreBoardData
                }
            });

        } catch (e:any) {
            //If error dispatch fail event
            dispatch({
                type: RENAME_USER_FAIL,
                errorMessage: e.message
            });
        }
}
