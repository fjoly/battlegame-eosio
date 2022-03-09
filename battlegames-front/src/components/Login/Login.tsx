import React from "react";
import Button from "../Button";
import {RootState} from "../../store/store";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {loginUserEvent} from "../../actions/user/login-action";
import './Login.css'
import {selectUserGameState} from "../../reducer/user-game.reducer";
import LoginModal from "./components/LoginModal/LoginModal";

//Use UserGameState
const mapState = (state:RootState) => ({
    gameState: selectUserGameState(state)
});
//Can fire loginUserEvent
const mapDispatch = {
    loginUserEvent
}

const connector = connect(mapState,mapDispatch);

type PropsFromRedux = ConnectedProps<typeof  connector>;

type Props = PropsFromRedux

//React component who handle Login Screen
const Login: React.FC<Props> = ({gameState}) => {
    const dispatch = useDispatch();

    //If user push Login button
    const onLoginHandler = async (event:React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        // Fire event of type login
        dispatch(loginUserEvent());
    }

    return (
        <div className="Login">
            <div className="title">Battle GAMES</div>
            <div className="description">
                <div>
                    <div>Create an account on testnet and link it to Scatter before attempt to login</div>

                </div>
            </div>
                <div className="field login-error">
                    { gameState.isOnError && <span className="error">{ gameState.errorMessage }</span> }
                </div>
                <div className="bottom">
                    <Button onClick={onLoginHandler} className="green" isLoading={gameState.isLoading}>
                        { "LOGIN" }
                    </Button>
                    <LoginModal />
                </div>
        </div>
    )

}
export default connector(Login);