import {gql, ApolloClient, InMemoryCache, DefaultOptions} from "@apollo/client";
import {SingleUserScoreBoardType} from "../model/single-user-score-board.type";
import {RenameUserType} from "../model/user.type";

/**
 * Function in order to communicate with backend project
 */

//Default options Graphql connection
const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
}

//Default configuration Graphql connection
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
});


//GraphQl query to get username from user accountName
const GET_USERNAME = gql`
  query($accountName: String!) {
       game(accountName: $accountName) {
        userName
      }
}
`;

//GraphQl query to get scoreboard data (Top 10 user by ratio)
const GET_SCOREBOARD = gql`
query {
  gameScoreBoard {
    accountName
    userName
    winCount
    lostCount
    ratio
  }
}
`;

//Rename the user mutation
export const renameUser = async (accountName:string,userName:string):Promise<RenameUserType> => {
    //GraphQl mutation in order to rename user into the application
    const RENAME_USER = gql`
    mutation($accountName: String!,$userName: String!) {
      renameUserName (
        renameUserName : {
          accountName: $accountName
          userName: $userName
        }
      ) {
        userName
        accountName
      }
    }
    `;
    try {
        //Call back end
        const result = await client.mutate({
            mutation : RENAME_USER,
            variables: {accountName, userName}
        });
        return result.data.renameUserName;
    } catch (error) {
        throw (error)
    }

}
//Get the score board data
export const getScoreBoard = async ():Promise<SingleUserScoreBoardType[]> => {
    try {
        //Call back end
        const result = await client.query({
            query : GET_SCOREBOARD
        });
        return result.data.gameScoreBoard;
    } catch (error) {
        throw (error)
    }

}
//Get the userName data from accountName
export const getUserName = async (accountName:string):Promise<string> => {
    try {
        //Call back end
        const result = await client.query({
            query : GET_USERNAME,
            variables: {accountName}
        });
        return result.data.game.userName;
    } catch (error) {
        throw (error)
    }
}