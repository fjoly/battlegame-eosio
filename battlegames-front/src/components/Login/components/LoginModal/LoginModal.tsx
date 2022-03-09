import React, {useState} from 'react';
import Modal from 'react-modal';
import Button from "../../../Button";
import './LoginModal.css'
// Components

Modal.setAppElement('#root');

const LoginModal: React.FC = () => {
  //State to know if the modal has to be open or close
  const [modalIsOpen,SetModalIsOpen] = useState(false);

  //Open set state
  const openModal = () =>  {
    SetModalIsOpen(true);
  }

  //Close set state
  const closeModal = () =>  {
    SetModalIsOpen(false);
  }
    return (
      <div>
        <Button onClick={ openModal } className="small blue" isLoading={false}>HOW TO LOGIN</Button>
        <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ closeModal }
          className={ `ModalContent` }
          overlayClassName="ModalOverlay">
          <div className="LoginModal">
            <div className="title">How to login</div>
            <ul>
              <li><div>Create an account on testnet  ={'>'} create account <a href="https://testnet.eos.io/">here</a></div></li>
              <li><div>Install scatter ={'>'} download scatter <a href="https://github.com/GetScatter/ScatterDesktop/releases">here</a></div></li>
              <li>
                <div>Configure a new network on scatter with this data :</div>
                <ol>
                  <li>Name : Block.one</li>
                  <li>Blockchain : EOSIO</li>
                  <li>Host : api.testnet.eos.io</li>
                  <li>Port : 443</li>
                  <li>Protocol : https</li>
                  <li>ChainID : cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f</li>
                </ol>
              </li>
               <li><div>Finally import your account (with your private key) on scatter</div></li>
            </ul>
          </div>
          <div onClick={ closeModal }><i className="ButtonClose">Close</i></div>
        </Modal>
      </div>
    )
}

export default LoginModal;
