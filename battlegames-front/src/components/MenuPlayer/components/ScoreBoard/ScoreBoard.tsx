import React from "react";
import './ScoreBoard.css'
import SinglePlayerScoreBoard from "../SinglePlayerScoreBoard/SinglePlayerScoreBoard";
import {ScoreBoardType} from "../../../../model/single-user-score-board.type";

//Props needed in order to display ScoreBoard
export interface ScoreBoardProps {
    scoreBoardState: ScoreBoardType,
}
//Score board react component
const ScoreBoard: React.FC<ScoreBoardProps> = ({scoreBoardState}) => {
    // function generating all score board line
    const generateScoreBoard = (scoreBoardState:ScoreBoardType) => {
        const elems  = [] as any;
        // For each data
        scoreBoardState.data.forEach(data => {
            // Prepare properties for `SinglePlayerScoreBoard`
            const playerBoardData = {
                userName: data.userName,
                winCount: data.winCount,
                lostCount: data.lostCount,
                ratio: data.ratio,
            };
            // Put the `SinglePlayerScoreBoard` to `elems` array
            elems.push(<SinglePlayerScoreBoard key={data.userName} { ...playerBoardData }/>);
        })
        //Return all elements
        return elems;
    };
    //Render ScoreBoard component
    //Spinner if loading mode
    //Error message if error during back call
    //Else render scoreboard table
    return (
        <div className="ScoreBoard">
        {
            scoreBoardState.isLoading ?
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
                :
            <div className="ScoreBoardTable">
                <div className="title">Score board</div>
                <div className="table">
                    <div className="row-legend">
                        <div className="cell">USERNAME</div>
                        <div className="cell">WIN</div>
                        <div className="cell">LOST</div>
                        <div className="cell">RATIO</div>
                    </div >
                    { scoreBoardState !== undefined && generateScoreBoard(scoreBoardState) }
                </div >
                <div className="field load-error">
                    { scoreBoardState.isOnError &&
                        <span className="error">{ scoreBoardState.errorMessage }</span>
                    }
                </div>
            </div>
        }
        </div>
    )

}
export default ScoreBoard;