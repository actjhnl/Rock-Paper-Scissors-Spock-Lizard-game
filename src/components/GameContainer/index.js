import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import io from 'socket.io-client';
import { socketConnect } from 'socket.io-react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import {styles,drawerWidth} from './GameContainerStyles';
class GameContainer extends Component {
  componentDidMount(){
     const {socket,room} = this.props;
     socket.emit('test',room);
     socket.on('message',(message)=>{
       alert(message)
     })
  }
  render() {
    const { classes } = this.props;

    const drawerChat = ( // чат
      <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <div className={classes.toolbar} />
        <Divider />
        <List>

        </List>
      </Drawer>
    );
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Rock-Paper-Scissors-Spock-Lizard game
              </Typography>
            </Toolbar>
          </AppBar>
          {drawerChat}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <div className={classes.main}>
              <h2>game screen</h2>
            </div>
            <div className={classes.gestureBar}>
              gestures
            </div>
            <Paper className={classes.inputMessagePanel}>
              <textarea rows="7" style={{width:'90%'}}/><br/>
              <button>Send</button>
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
