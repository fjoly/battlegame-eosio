import React, {useEffect, useState} from "react";
import {RootState} from "../../store/store";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {selectUserGameState} from "../../reducer/user-game.reducer";
import PlayerProfile from "../MenuPlayer/components/PlayerProfile/PlayerProfile";
import GameMat from "./components/GameMat/GameMat";
import GameInfo from "./components/GameInfo/GameInfo";
import {playCardEvent} from "../../actions/game/play-card-action";
import './Game.css'
import Resolution from "./components/Resolution";
import {nextRoundEvent} from "../../actions/game/next-round-action";
import {endGameEvent} from "../../actions/game/end-game-action";
import ScoreBoard from "../MenuPlayer/components/ScoreBoard/ScoreBoard";
import {loadScoreBoardEvent} from "../../actions/scoreBoard/load-score-board";
import {selectScoreBoardState} from "../../reducer/score-board.reducer";

//User scoreBoard & userGame state
const mapState = (state:RootState) => ({
    gameState: selectUserGameState(state),
    scoreBoardState : selectScoreBoardState(state)
});

//Can fire playCard,NextRound,EndGame and LoadScoreBoard event
const mapDispatch = {
    playCardEvent,
    nextRoundEvent,
    endGameEvent,
    loadScoreBoardEvent,
}

const connector = connect(mapState,mapDispatch);

type PropsFromRedux = ConnectedProps<typeof  connector>;

export type GameProps = PropsFromRedux
//React Component for the entire game display screen (After login)
const Game: React.FC<GameProps> = ({gameState,scoreBoardState}) => {
    const dispatch = useDispatch();
    //In order to know if a game is started or not
    const initialGameStartedState = gameState.game_data && gameState.game_data.deck_ai.length !== 17;
    // UseState flag for handling if game is Started or Finish
    const [isGameStarted,SetIsGameStarted] = useState(initialGameStartedState);
    const [isResolutionDisplayed,SetIsResolutionDisplayed] = useState((gameState.game_data?.selected_card_ai!== undefined && gameState.game_data?.selected_card_ai > 0));

    //For every Game data changing
    useEffect(() => {
        // Reconsider if game is started or not
        const isStart= gameState.game_data && gameState.game_data.deck_ai.length !== 17;
        //If game not started we display player info with score board so we have to refresh scoreBoard Data
        if(!isStart){
            dispatch(loadScoreBoardEvent())
        }
        //Refresh gameStarted state
        SetIsGameStarted(isStart);
        SetIsResolutionDisplayed(true);
    }, [gameState.game_data]);

    //On Quit button
    const endGameHandler = (event :React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //If game not loading mode fire EndGame event
        dispatch(endGameEvent())
    }

    //On NextRound button
    const nextRoundHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //If game not loading mode fire NextRound event
        dispatch(nextRoundEvent())
    }
    //On card selected by user
    const playCardHandler = (cardIdx:number,event:React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        SetIsResolutionDisplayed(true);
        // If it is an empty card or game in loading state, not going to do anything
        if (gameState.game_data?.hand_player[cardIdx] === 0) {
            return;
        }
        //Fire Play card event
        dispatch(playCardEvent(cardIdx))
    }

    //On NextRound button
    const quitResolutionHandler = () => {
        //If game not loading mode fire NextRound event
        SetIsResolutionDisplayed(false);
    }

    return (
        <section className="Game">
            { !isGameStarted ?
                <div className="containerPlayerProfile">
                    <PlayerProfile/>
                    { (scoreBoardState.isLoading || scoreBoardState.data?.length > 0 ) && <ScoreBoard scoreBoardState={scoreBoardState}/> }
                </div>
                :
                <div className="container">
                    <GameMat
                        aiHandCards={gameState.game_data?.hand_ai}
                        aiLife={gameState.game_data?.life_ai}
                        aiName="AI"
                        deckCardCount={gameState.game_data?.deck_ai.length}
                        onPlayCard={playCardHandler}
                        playerHandCards={gameState.game_data?.hand_player}
                        playerLife={gameState.game_data?.life_player}
                        playerName={gameState.userName}/>
                    { isResolutionDisplayed &&
                        <Resolution
                            isOnError={gameState.isOnError}
                            onQuitResolution={quitResolutionHandler}
                            isLoading={gameState.isLoading}
                            status={ gameState.game_data?.status }
                            aiCard={ gameState.game_data?.selected_card_ai }
                            aiName="COMPUTER"
                            aiLost={ gameState.game_data?.life_lost_ai }
                            playerCard={ gameState.game_data?.selected_card_player }
                            playerName={ gameState.userName }
                            playerLost={ gameState.game_data?.life_lost_player }
                            onEndGame={endGameHandler} onNextRound={nextRoundHandler}/>
                    }

                    <GameInfo
                        isLoading={gameState.isLoading}
                        deckCardCount={gameState.game_data?.deck_ai.length}
                        handCardCount={gameState.game_data?.hand_ai.filter( x => { return x > 0}  ).length}
                        onEndGame={endGameHandler} />
                    <div className="field action-error">
                        { gameState.isOnError && <span className="error">{ gameState.errorMessage }</span> }
                    </div>
                </div>
            }
            {
                isGameStarted && gameState.isLoading &&
                <div className="spinner">
                    <div className="image"></div>
                    <div className="circles">
                        <div className="circle">
                            <div className="inner"></div>
                        </div>
                        <div className="circle">
                            <div className="inner"></div>
                        </div>
                        <div className="circle">
                            <div className="inner"></div>
                        </div>
                        <div className="circle">
                            <div className="inner"></div>
                        </div>
                        <div className="circle">
                            <div className="inner"></div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )

}
export default connector(Game);