import React, { Component } from 'react';
import {compose} from 'recompose';
import './LoginForm.css';
import { socketConnect } from 'socket.io-react';
import {clienUrl} from '../../config.js';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Paper,TextField} from 'material-ui';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

class LoginForm extends Component {
  componentDidMount(){
    const {socket,room} = this.props;
    socket.emit('start',room);
    socket.on('ready',()=>{
      this.props.startGame();
    })
  }
  render() {
    const {classes, room} = this.props;
    return (
      <div  className="login-form">
        <Paper className={classes.root} elevation={4}>
          <TextField
            label="Link"
            id="margin-none"
            value = {`${clienUrl}?${room}`}
            className={classes.textField}
            helperText="Copy the link in your browser"
          />
        </Paper>
      </div>
    );
  }
}
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
export default compose(materialWrapper,socketConnect)(LoginForm);
