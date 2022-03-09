export interface ScoreBoardType {
    isLoading: boolean,
    errorMessage: string,
    isOnError: boolean,
    data :  SingleUserScoreBoardType[]
}

export interface SingleUserScoreBoardType {
    userName: string,
    winCount: number,
    lostCount: number,
    ratio: number
}