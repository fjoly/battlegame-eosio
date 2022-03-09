import React from "react";
import './SinglePlayerScoreBoard.css'

//Props needed for a scoreboard line
export interface PlayerBoardProps {
    userName: string | undefined,
    winCount: number | undefined,
    lostCount: number | undefined,
    ratio: number | undefined,
}

//React component of a scoreBoard line
const SinglePlayerScoreBoard: React.FC<PlayerBoardProps> = ({userName,winCount,lostCount,ratio}) => {
    const displayRatio = ratio?.toPrecision(3);
    return (
        <div  className="row">
            <div className="cell" >{userName}</div>
            <div className="cell" >{winCount}</div>
            <div className="cell" >{lostCount}</div>
            <div className="cell" >{displayRatio}</div>
        </div >
    )

}
export default SinglePlayerScoreBoard;