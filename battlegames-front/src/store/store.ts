import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import userGameReducer from "../reducer/user-game.reducer";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import scoreBoardReducer from "../reducer/score-board.reducer"; // defaults to localStorage for web

const rootReducer = combineReducers({
    userGame: userGameReducer,
    scoreBoard: scoreBoardReducer
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(persistedReducer,applyMiddleware(thunk));

export default store;
