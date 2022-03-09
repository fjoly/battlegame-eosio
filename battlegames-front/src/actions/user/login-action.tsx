import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getGameData, login} from "../../services/eos-game.api";
import {UserType} from "../../model/user.type";
import {getUserName} from "../../services/back-end.api";


/*
    Description of user login actions
 */

//Description action user login request
export const LOGIN_USER_REQUEST = "user/login_request";
export type LoginUserRequestAction = Action<typeof LOGIN_USER_REQUEST>

//Description action user login success
export const LOGIN_USER_SUCCESS = "user/login_success";
export interface LoginUserSuccessAction extends Action<typeof LOGIN_USER_SUCCESS> {
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' >
}

//Description action user login fail
export const LOGIN_USER_FAIL = "user/login_fail";
export interface LoginUserFailAction extends Action<typeof LOGIN_USER_FAIL> {
    errorMessage: string;
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

/*
    Description of user login event
 */

export const loginUserEvent = (): ThunkAction<
    void,
    RootState,
    undefined,
    LoginUserRequestAction | LoginUserFailAction | LoginUserSuccessAction> =>
    async (dispatch) => {

        dispatch({
            type: LOGIN_USER_REQUEST
        });
        try {
            //Login Action
            const res = await login();
            //Call backend to know if user as been renamed or not
            const userName= await getUserName(res.accountName);
            //If no error dispatch success event
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    userName:userName,
                    accountName:res.accountName,
                    win_count:res.win_count,
                    lost_count:res.lost_count,
                    game_data:res.game_data
                }
            });

        } catch (e:any) {
            //If  error dispatch fail event
            const gameData =  await getGameData();
            dispatch({
                type: LOGIN_USER_FAIL,
                errorMessage: e.message,
                payload: gameData
            });
        }
}
