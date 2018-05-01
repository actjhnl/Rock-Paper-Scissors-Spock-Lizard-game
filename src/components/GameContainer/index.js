import React, { Component } from 'react';
import {compose} from 'recompose';
import io from 'socket.io-client';
import { socketConnect } from 'socket.io-react';
import {Header} from '../'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import {
  Drawer,AppBar,Toolbar,
  List,TextField,Typography,
  Divider,Paper
} from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

import {styles,drawerWidth} from './GameContainerStyles';
class GameContainer extends Component {
  state = {
    messages: []
  }
  componentDidMount(){
    this.props.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages]})
    })
  }
  handleSubmit = (event) => {
    const {socket,room} = this.props;
    const body = event.target.value
    if (event.keyCode === 13 && body !== '') {
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages]})
      socket.emit('message', body)
      event.target.value = '';
    }
  }

  render() {
    const { classes } = this.props;
    const messages = this.state.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.from}: {message.body}</b>
      </li>
    });
    const drawerChat = ( // чат
      <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {messages}
        </List>
      </Drawer>
    );
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
        {/*header*/}
          <Header />
          {/*sideBarChat*/}
          {drawerChat}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {/*main game screen*/}
            <div className={classes.main}>
              <h2>game screen</h2>
            </div>
            {/*gesturesBar*/}
            <div className={classes.gestureBar}>
              gestures
            </div>
            {/*inputMessagePanel*/}
            <Paper className={classes.inputMessagePanel}>
              <textarea rows="7"
                        style={{width:'90%'}}
                        placeholder="Сообшение в чат..."
                        onKeyUp={this.handleSubmit}
              /><br/>
              <button onClick={this.handleSubmit}>Send</button>
            </Paper>
          </main>
        </div>
      </div>
    );
  }
}
GameContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
const materialWrapper = withStyles(styles);
export default compose(materialWrapper,socketConnect)(GameContainer);
