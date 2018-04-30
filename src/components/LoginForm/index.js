import React, { Component } from 'react';
import './LoginForm.css';
import uuidv4 from 'uuid/v4';
import { socketConnect } from 'socket.io-react';
import {clienUrl, socketUrl} from '../../config.js';
//const room = uuidv4();
class LoginForm extends Component {
  componentDidMount(){
    const {socket,room} = this.props;
    socket.emit('start',room);
    socket.on('ready',()=>{
      this.props.startGame();
    })
  }
  render() {
    const {room} = this.props;
    return (
      <div className="login-form">
        <div className="login-form__container">
          <h3>Login Form</h3>
            <i>link:</i>
            <p>{`${clienUrl}?${room}`}</p>
        </div>
      </div>
    );
  }
}

export default socketConnect(LoginForm);
