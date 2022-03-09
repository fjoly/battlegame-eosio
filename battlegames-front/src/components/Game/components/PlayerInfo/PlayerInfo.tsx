import React from "react";
import './PlayerInfo.css'
//Props needed for PlayerInfo component
export interface PlayerInfoProps {
    name: string | undefined,
    life: number | undefined,
}
//PlayerInfo component
const PlayerInfo: React.FC<PlayerInfoProps & React.HTMLAttributes<HTMLDivElement>> = ({name,className,life}) => {
    // Display name of the Player / AI according to props,
    //         hearts, by generateHearts function
    //         life in text, show 0 if it is negative
    return (
        <div className={`PlayerInfo${ className ? ' ' + className : '' }`}>
        {
        (name!== undefined && life !== undefined) ?
            <div>
                <div className="name">{ name }</div>
                <div className={`life life${life}`}/>
                <div className="lifepoints">{ life < 0 ? 0 : life }/5</div>
            </div>
            :
            <div/>
        }
        </div>
    )
}
export default PlayerInfo;