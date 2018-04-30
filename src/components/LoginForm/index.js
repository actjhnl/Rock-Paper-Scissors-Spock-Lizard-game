import React, { Component } from 'react';
import './LoginForm.css';
import uuidv4 from 'uuid/v4';
import io from 'socket.io-client';

import {clienUrl, socketUrl} from '../../config.js'

const room = uuidv4();
class LoginForm extends Component {
  componentDidMount(){
    this.socket  = io(socketUrl);
    this.socket.emit('start',room)
    this.socket.on('ready',()=>{
      this.props.startGame();
    })
  }
  render() {
    return (
      <div className="login-form">
        <div className="login-form__container">
          <h3>Login Form</h3>
            <i>link :</i>
            <p>{`${clienUrl}?${room}`}</p>
        </div>
      </div>
    );
  }
}

export default LoginForm;
