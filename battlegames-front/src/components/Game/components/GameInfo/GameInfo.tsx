import React from "react";
import Button from "../../../Button";
import './GameInfo.css'
//Props needed for GameInfo component
export interface GameInfoProps {
    deckCardCount: number | undefined,
    handCardCount: number  | undefined,
    onEndGame: (event:React.MouseEvent<HTMLButtonElement>) => void,
    isLoading : boolean
}
//GameInfo component
const GameInfo: React.FC<GameInfoProps & React.HTMLAttributes<HTMLDivElement>> = ({deckCardCount,handCardCount,onEndGame,className,isLoading}) => {
    // Display:
    // Round number: 18 <-- ((max deck = 17) + 1) - Deck Cards - Hand Cards
    // Button to quit to end the current game
    return (
        <div>
            { (deckCardCount!== undefined && handCardCount!== undefined) &&
                <div className={`Info${ className ? ' ' + className : '' }`}>
                    { <p>ROUND <span className="round-number">{ 18 - deckCardCount - handCardCount }/17</span></p> }
                    <div><Button isLoading={isLoading} onClick={ onEndGame } className="small red">QUIT</Button></div>
                </div>
            }
        </div>

    )
}
export default GameInfo;