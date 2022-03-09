import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import Button from "../../../Button";
import {RootState} from "../../../../store/store";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {selectUserGameState} from "../../../../reducer/user-game.reducer";
import {gameStartEvent} from "../../../../actions/game/start-game-action";
import './PlayerProfile.css'
import {logoutUserEvent} from "../../../../actions/user/logout-action";
import {renameUserEvent} from "../../../../actions/user/rename-action";
import {loadScoreBoardEvent} from "../../../../actions/scoreBoard/load-score-board";

//User userGameState
const mapState = (state:RootState) => ({
    gameState: selectUserGameState(state)
});
//Handle gameStartEvent/logoutEvent and loadScoreBoardEvent
const mapDispatch = {
    gameStartEvent,
    logoutUserEvent,
    loadScoreBoardEvent,
}

const connector = connect(mapState,mapDispatch);

type PropsFromRedux = ConnectedProps<typeof  connector>;

type Props = PropsFromRedux
//Player profile react component
const PlayerProfile: React.FC<Props> = ({gameState}) => {
    const dispatch = useDispatch();

    //State in order to display rename field
    const [isSelected,SetIsSelected] = useState(false);

    //State for saving userName field
    const [userName,SetUserName] = useState(gameState?.userName);

    const inputRef = useRef<HTMLInputElement>(null)

    //User effect to keep focus if user select input rename field
    useEffect(() => {
        if(isSelected){
            inputRef.current?.focus();
        }
    },[isSelected]);

    //If gameState userName field is changing hide renaming fields
    useEffect(() => {
        SetIsSelected(false)
    },[gameState.userName]);

    // Handle start button action
    const onStartGameHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //If game state define and gameState is not loading
        dispatch(gameStartEvent())
    }

    // Handle logout button action
    const onLogoutHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //If game state define and gameState is not loading
        dispatch(logoutUserEvent())
    }

    // Handle Rename click field action
    const onRenameHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        //If game state define and gameState is not loading
        SetIsSelected((prevState => !prevState))
    }

    // Handle Send rename click field action
    const onSendRenameHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(renameUserEvent(gameState?.accountName,userName))
    }

    // Runs on every keystroke to update the React state
    const onChangeHandler = (event:  ChangeEvent<HTMLInputElement>) => {
        SetUserName(event.target.value);
    }

    return (
        <div className="PlayerProfile">
            <div className="title">Elemental Battles - powered by EOSIO</div>
            <div className="welcome">
                <span>Welcome</span>
            </div>
            <div className="username"  >
                <span onClick={onRenameHandler} >{ gameState?.userName }</span>
                { isSelected &&
                    <div className="field">
                        <label>New username : </label>
                        <input
                            ref={inputRef}
                            type="text"
                            name="username"
                            value={ userName }
                            placeholder="All small letters, a-z, 1-5 or dot, max 12 characters"
                            onChange={onChangeHandler}
                            pattern="[\.a-z1-5]{2,12}"
                            required
                        />
                        <Button isLoading = {gameState?.isLoading} className="green" onClick={onSendRenameHandler}>SEND</Button>
                    </div>
                }
            </div>
            <div className="record">
                <p>Your Current Record</p>
                <div className="recordData">
                    <span>Win <span className="count">{ gameState?.win_count }</span></span>
                    <span> | </span>
                    <span>Lost <span className="count">{ gameState?.lost_count }</span></span>
                </div>
            </div>
            <div className="buttons">
                {<Button isLoading = {gameState?.isLoading} className="green" onClick={onStartGameHandler}>START</Button>}
                {<Button isLoading = {gameState?.isLoading} className="red" onClick={onLogoutHandler}>LOGOUT</Button>}
            </div>
        </div>
    )
}
export default connector(PlayerProfile);