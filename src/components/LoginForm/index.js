import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGame,showLoader} from '../../AC';
import { socketConnect } from 'socket.io-react';
import * as e from '../../constants';
import {clientUrl} from '../../config.js';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import {Paper,TextField,Typography} from 'material-ui';

import {styles} from './LoginFormStyle';
/**
 * Компонент встречает нового пользователя.
 * Отображение зависит от состояния "start"
 */
class LoginForm extends Component{
  componentDidMount(){
    const {socket,room} = this.props;
    socket.emit(e.START_GAME,room);
    socket.on(e.READY,()=>{
      this.props.startGame();
      this.props.showLoader();
    })
  }
  render() {
    const {classes, room} = this.props;
    return (
      <div  className={classes.loginForm}>
        <div className={classes.band}>
          <div>
          <Typography variant="headline" component="h1" style={{color:'white'}}>
            Hi, you may start the game
          </Typography>
          <Paper className={classes.root} elevation={4}>
            <TextField
              label="Link"
              id="margin-none"
              value = {`${clientUrl}?${room}`}
              className={classes.textField}
              helperText="Copy the link in your browser"
            />
          </Paper>
          </div>
        </div>
      </div>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  loader:state.loader
}),{startGame,showLoader})
export default compose(reduxWrapper,materialWrapper,socketConnect)(LoginForm);
