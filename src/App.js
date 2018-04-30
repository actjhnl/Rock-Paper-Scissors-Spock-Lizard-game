import React, { Component } from 'react';
import {LoginForm} from './components'
const style = {
  height: '800px'
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
            <LoginForm startGame={this.startGame}/>
        :
        <div><h1>Success</h1></div>
      }

      </div>
    );
  }
}

export default App;
