import React from "react";
import './Card.css'

// Card dictionary from smart contract
// { [cardType, cardPower], ... }
const cardDict = [
    [0, 0], // empty card (for the case the card is played or empty selected card)
    [1, 1], [1, 1],
    [1, 2], [1, 2],
    [1, 3],
    [2, 1], [2, 1],
    [2, 2], [2, 2],
    [2, 3],
    [3, 1], [3, 1],
    [3, 2], [3, 2],
    [3, 3],
    [4, 3],
    [5, 0]
];

//Props needed for Card component
export interface CardProps {
    cardId: number | undefined,
    onClick: (event:React.MouseEvent<HTMLAnchorElement>) => void
}
//Card component
const Card: React.FC<CardProps> = ({cardId,onClick}) => {
    // If it is not an empty card and onClick is set, set Tag as <a>, <div> otherwise
    const Tag = cardId !== 0 && onClick ? `a` : `span`;
    // Determine the card element
    let cardType = "";
    if (cardId !== undefined){
        switch (cardDict[cardId][0]) {
            case 1:
                cardType = "FIRE";
                break;
            case 2:
                cardType = "WOOD";
                break;
            case 3:
                cardType = "WATER";
                break;
            case 4:
            case 5:
                cardType = "SPECIAL";
                break;
            default:
                cardType = "EMPTY";
        }
    }
    return (
        <span>
            { cardId !== undefined &&
                <Tag
                    className={ `Card ${ "type" + cardDict[cardId][0] } ${ "card" + cardId }` }
                    onClick={(e) => onClick(e) }>
                    <span className="type">{ cardType }</span>
                    <span className="power">{ cardId !== 0 && cardDict[cardId][1] }</span>
                </Tag>
            }
        </span>

    )

}
export default Card;