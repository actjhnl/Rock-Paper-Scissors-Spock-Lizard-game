import React, { Component } from 'react';
import {LoginForm,GameContainer} from './components'
import uuidv4 from 'uuid/v4';
const room = uuidv4();
const style = {
  height: '100%'
}
class App extends Component {
  state = {
    start: false
  }
  startGame = () =>{
    this.setState({start:!this.state.start})
  }
  render() {
    const {start} = this.state;
    return (
      <div style={style}>
      {
        !start ?
            <LoginForm startGame={this.startGame} room={room}/>
        :
        <GameContainer room={room}/>
      }
      </div>
    );
  }
}

export default App;
