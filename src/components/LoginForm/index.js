import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {startGame} from '../../AC';
import { socketConnect } from 'socket.io-react';
import {clientUrl} from '../../config.js';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Paper,TextField} from 'material-ui';

import {styles} from './LoginFormStyle';

class LoginForm extends Component {
  state = {
    err: false
  }
  componentDidMount(){
    const {socket,room} = this.props;
    socket.emit('start',room);
    socket.on('ready',()=>{
      this.props.startGame();
    })
    socket.on('err',()=>{
      this.setState({err:true})
    })
  }
  render() {
    const {classes, room} = this.props;
    return (
      <div  className={classes.loginForm}>
        {
          this.state.err ?
            <h1>Sorry</h1>
          :
            <Paper className={classes.root} elevation={4}>
              <TextField
                label="Link"
                id="margin-none"
                value = {`${clientUrl}?${room}`}
                className={classes.textField}
                helperText="Copy the link in your browser"
              />
            </Paper>
        }
      </div>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(null,{startGame})
export default compose(reduxWrapper,materialWrapper,socketConnect)(LoginForm);
