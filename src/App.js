import React, { Component } from 'react';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {compose} from 'recompose';
import {startGame} from './AC';
import {LoginForm,GameContainer} from './components'
import uuidv4 from 'uuid/v4';
const room = uuidv4();
const style = {
  height: '100%'
}
class App extends Component {
  render() {
    const {start} = this.props;
    return (
      <div style={style}>
      {
        !start ?
            <LoginForm room={room}/>
        :
        <GameContainer room={room}/>
      }
      </div>
    );
  }
}
const reduxWrapper = connect(state=>({
  start: state.start
}),{startGame})
export default compose(reduxWrapper,socketConnect)(App);
