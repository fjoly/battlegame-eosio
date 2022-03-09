//Model for GameData structure from Eos contract
export interface EosGameType {
    deck_ai :number[],
    life_ai: number,
    hand_ai: number[],
    life_player: number,
    hand_player: number[],
    deck_player:number[],
    selected_card_player: number,
    selected_card_ai: number,
    life_lost_player: number,
    life_lost_ai: number,
    status: number,
}
// Data structure in order to push a play card action
export interface PlayCardType {
    username: string,
    player_card_idx: number,
}