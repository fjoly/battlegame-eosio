import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getGameData, logout} from "../../services/eos-game.api";


/*
    Description of user LOGOUT actions
 */

//Description action user LOGOUT request
export const LOGOUT_USER_REQUEST = "user/logout_request";
export type LogoutUserRequestAction = Action<typeof LOGOUT_USER_REQUEST>

//Description action user LOGOUT success
export const LOGOUT_USER_SUCCESS = "user/logout_success";
export type LogoutUserSuccessAction = Action<typeof LOGOUT_USER_SUCCESS>

//Description action user LOGOUT fail
export const LOGOUT_USER_FAIL = "user/logout_fail";
export interface LogoutUserFailAction extends Action<typeof LOGOUT_USER_FAIL> {
    errorMessage: string;
}

/*
    Description of user LOGOUT event
 */

export const logoutUserEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    LogoutUserRequestAction | LogoutUserFailAction | LogoutUserSuccessAction> =>
    async (dispatch) => {
    //Start by dispatch request event
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
        try {
            //Attempt to logout
            await logout();
            //If no error dispatch success event
            dispatch({
                type: LOGOUT_USER_SUCCESS
            });
        } catch (error:any) {
            //If  error dispatch fail event
            const gameData =  await getGameData();
            dispatch({
                type: LOGOUT_USER_FAIL,
                errorMessage: error.message,
                payload: gameData
            });
        }


}
