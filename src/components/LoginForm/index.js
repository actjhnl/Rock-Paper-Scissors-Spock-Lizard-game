import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGame,showLoader} from '../../AC';
import { socketConnect } from 'socket.io-react';
import {clientUrl} from '../../config.js';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import {Paper,TextField,Typography} from 'material-ui';

import {styles} from './LoginFormStyle';

class LoginForm extends Component{
  componentDidMount(){
    const {socket,room} = this.props;
    socket.emit('start',room);
    socket.on('ready',()=>{
      this.props.startGame();
      this.props.showLoader();
    })
  }
  render() {
    const {classes, room} = this.props;
    return (
      <div  className={classes.loginForm}>
        {
          this.props.loader ?
            <CircularProgress className={classes.progress} size={50} />
          :
            <div>
            <Typography variant="headline" component="h1">
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
        }
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
