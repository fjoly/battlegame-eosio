import {RootState} from "../../store/store";
import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {getGameData, playCard} from "../../services/eos-game.api";
import {UserType} from "../../model/user.type";


/*
    Description of user playcard actions
 */

//Description action user playcard request
export const PLAY_CARD_REQUEST = "game/play_card_request";
export type PlayCardRequestAction = Action<typeof PLAY_CARD_REQUEST>

//Description action user playcard success
export const PLAY_CARD_SUCCESS = "game/play_card_success";
export interface PlayCardSuccessAction extends Action<typeof PLAY_CARD_SUCCESS> {
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Description action user playcard fail
export const PLAY_CARD_FAIL = "game/play_card_fail";
export interface PlayCardFailAction extends Action<typeof PLAY_CARD_FAIL> {
    errorMessage: string;
    payload: Omit<UserType,'isLoading' | 'errorMessage' | 'isOnError' | 'userName'>
}

//Function handling playCard event
export const playCardEvent = (player_card_index:number): ThunkAction<
    void,
    RootState,
    undefined,
    PlayCardRequestAction | PlayCardSuccessAction | PlayCardFailAction> =>
    async (dispatch) => {
        dispatch({
            type: PLAY_CARD_REQUEST
        });
        try {
            //Push play card action into blockchain
            const gameInfo = await playCard(player_card_index);
            //If no error dispatch success event
            dispatch({
                type: PLAY_CARD_SUCCESS,
                payload: gameInfo
            });
        } catch (e:any) {
            //If  error dispatch fail event
            const gameData =  await getGameData();
            dispatch({
                type: PLAY_CARD_FAIL,
                errorMessage: e.message,
                payload: gameData
            });
        }
}
