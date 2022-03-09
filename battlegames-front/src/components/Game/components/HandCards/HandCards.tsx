import React from "react";
import Card from "../Card/Card";
import './HandCards.css'

//Props needed for HandCard component
export interface HandCardsProps {
    className: string,
    onPlayCard: (id:number,event:React.MouseEvent<HTMLAnchorElement>) => void
    cards: number[] | undefined
}
//HandCard component
const HandCards: React.FC<HandCardsProps> = ({className,onPlayCard,cards}) => {
    // function in render for generating `Card`s
    const generateCards = (cards:number[]) => {
        const elems  = [] as any;
        // Hard coded 4 as the max of loop as every user has 4 hand cards
        for (let i = 0; i < 4; ++i) {
            // Prepare properties for `Card`
            const cardProperties = {
                key: i,
                cardId: cards[i],
            };

            // Put the `Card` to `elems` array
            <Card { ...cardProperties } onClick={(e) => onPlayCard(i,e)}/>
            elems.push(<Card { ...cardProperties } onClick={(e) => onPlayCard(i,e)}/>);
        }
        return elems;
    };

    return (
        <div className={`HandCards${ className ? ' ' + className : '' }`}>
            { cards !== undefined && generateCards(cards) }
        </div>
    )

}
export default HandCards;