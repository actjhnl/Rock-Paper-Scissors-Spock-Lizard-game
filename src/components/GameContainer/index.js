import React, { Component } from 'react';
import io from 'socket.io-client';

import {clienUrl, socketUrl} from '../../config.js';
class GameContainer extends Component {
  render() {
    return (
      <div className="game-container">
        Main
      </div>
    );
  }
}

export default GameContainer;
