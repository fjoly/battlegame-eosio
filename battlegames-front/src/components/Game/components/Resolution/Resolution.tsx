import React from "react";
import './Resolution.css'
import Card from "../Card";
import Button from "../../../Button";
//Props needed for Resolution component
export interface ResolutionProps {
    aiCard: number | undefined,
    aiName: string | undefined,
    aiLost: number | undefined,
    playerCard: number | undefined,
    playerName: string ,
    playerLost: number | undefined,
    status: number | undefined,
    onNextRound: (event:React.MouseEvent<HTMLButtonElement>) => void,
    onEndGame: (event:React.MouseEvent<HTMLButtonElement>) => void,
    onQuitResolution: () => void,
    isLoading: boolean,
    isOnError: boolean,
}
//Resolution component
const Resolution: React.FC<ResolutionProps & React.HTMLAttributes<HTMLDivElement>> = ({aiCard,aiName,aiLost,playerCard,playerName,playerLost,status,onNextRound,onEndGame,isLoading,onQuitResolution,isOnError}) => {

    // Flag to indicate if the resolution screen should be shown
    // By checking if aiSelectCard is not empty
    const isCardSelected = aiCard!== undefined && aiCard > 0;

    // Store the result of each round and decide where to put the "WIN" or "DRAW"
    let aiRoundResult :JSX.Element;
    let playerRoundResult:JSX.Element  ;
    if (aiLost === 0 && playerLost === 0) {
        aiRoundResult = <span>DRAW</span>;
        playerRoundResult = <span>DRAW</span>;
    } else if (aiLost === 0) {
        aiRoundResult = <span>WIN</span>;
        playerRoundResult = <span>- { playerLost }</span>;
    } else {
        aiRoundResult = <span>- { aiLost }</span>;
        playerRoundResult = <span>WIN</span>;
    }
    // If state === 1, display "YOU WIN!" (player wins)
    // If state === -1, display "YOU LOST!" (player loses)
    // And display: 1 div for left selected card
    //              1 div for showing VS text
    //              1 div for right selected card
    // And put the buttons for next round or end game
    return (
        <div>
            {isOnError && <div className="quit"><p onClick={onQuitResolution}>X</p></div>}
            <div className={`Resolution${ isCardSelected ? " card-selected" : "" }`}>
                <div className="render">
                    { status === 1 && <div className="result win">VICTORY</div> }
                    { status === -1 && <div className="result lost">DEFEATED</div> }
                    <div className="player">
                        <p className="round-result">{ isCardSelected && playerRoundResult }</p>
                        <Card cardId={ playerCard } onClick={() => undefined } />
                        <p className="name">{ playerName }</p>
                    </div>
                    <div className="vs">{ "VS" }</div>
                    <div className="ai">
                        <p className="round-result">{ isCardSelected && aiRoundResult }</p>
                        <Card cardId={ aiCard } onClick={() => undefined } />
                        <p className="name">{ aiName }</p>
                    </div>
                    <div className="buttons">
                        { isCardSelected && status === 0 &&
                            <Button isLoading={isLoading} onClick={ onNextRound }>NEXT ROUND</Button> }
                        { isCardSelected && status !== 0 &&
                            <Button isLoading={isLoading} onClick={ onEndGame } className="red">QUIT</Button> }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Resolution;