import React from 'react';
import Login from "../Login/Login";
import {RootState} from "../../store/store";
import {connect, ConnectedProps} from "react-redux";
import Game from "../Game/Game";
import './App.css'
import './reset.css'
import {selectUserGameState} from "../../reducer/user-game.reducer";

//Use userGameState
const mapState = (state:RootState) => ({
    gameState: selectUserGameState(state),
});
//Cannot fire any action
const mapDispatch = {
}

const connector = connect(mapState,mapDispatch);

type PropsFromRedux = ConnectedProps<typeof  connector>;

type Props = PropsFromRedux

//Main component of the applicatioon
const App: React.FC<Props> = ({gameState}) => {
    // Determine the app status for styling
    let appStatus = "login";
    if (gameState.game_data && gameState.game_data.status !== 0) {
        appStatus = "game-ended";
    } else if (gameState.game_data && gameState.game_data.selected_card_ai > 0) {
        appStatus = "card-selected";
    } else if (gameState.game_data && gameState.game_data.deck_ai.length !== 17) {
        appStatus = "started";
    } else if (gameState.userName) {
        appStatus = "profile";
    }

    //Choose to display Login component or Game component depending of userGameState
      return (
        <div className={ `App status-${ appStatus }${ gameState.isLoading ? " loading" : "" }` }>
            {
                gameState.userName ? <Game /> : <Login/>
            }
        </div>
      );
}

export default connector(App);
