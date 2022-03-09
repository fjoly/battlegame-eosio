import React from "react";
import './GameMat.css'
import HandCards from "../HandCards";
import PlayerInfo from "../PlayerInfo";
//Props needed for GameMat component
export interface GameMatProps {
    deckCardCount: number | undefined,
    aiLife: number | undefined,
    aiHandCards: number[] | undefined,
    aiName: string | undefined,
    playerLife: number | undefined,
    playerHandCards: number[] | undefined,
    playerName: string,
    onPlayCard: (cardId:number,event:React.MouseEvent<HTMLAnchorElement>) => void,
}
//GameMat component
const GameMat: React.FC<GameMatProps & React.HTMLAttributes<HTMLDivElement>> = ({deckCardCount,aiLife,aiHandCards,aiName,playerLife,playerHandCards,playerName,onPlayCard,className}) => {

    // Display the GameMat as a table with 2 rows
    // The 1st row is AI (`PlayerInfo`, Deck card, `HandCards`)
    // The 2nd row is Player (`PlayerInfo`, Deck card, `HandCards`)
    return (
        <table className={`GameMat${ className ? ' ' + className : '' }`}>
            <tbody>
            <tr>
                <td className="mat mat-ai">
                    <PlayerInfo
                        className="ai"
                        name={ aiName }
                        life={ aiLife }
                    />
                    <div className={`deck ai remain${deckCardCount}`}>
                        { aiName }`&apos;`S Deck ({ deckCardCount })
                    </div>
                    <HandCards
                        className="ai"
                        cards={ aiHandCards }
                        onPlayCard={() => undefined }
                    />
                </td>
            </tr>
            <tr>
                <td className="mat mat-player">
                    <PlayerInfo
                        className="player"
                        name={ playerName }
                        life={ playerLife }
                    />
                    <div className={`deck player remain${deckCardCount}`}>
                        { playerName } `&apos;`S Deck ({ deckCardCount })
                    </div>
                    <HandCards
                        className="player"
                        cards={ playerHandCards }
                        onPlayCard={ onPlayCard }
                    />
                </td>
            </tr>
            </tbody>
        </table>
    )

}
export default GameMat;