import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendMessage} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Paper} from 'material-ui';

import {styles} from './InputMessagePanelStyle'

class InputMessagePanel extends Component {
  handleSubmit = (event) => {
    const {socket} = this.props;
    const body = event.target.value
    if (event.keyCode === 13 && body !== '') {
      const message = {
        body,
        from: 'Me'
      }
      this.props.sendMessage(message)
      socket.emit('message', body)
      event.target.value = '';
    }
  }
  componentDidMount(){
    this.props.socket.on('message', message => {
      this.props.sendMessage(message)
    })
  }
  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.inputMessagePanel}>
        <textarea rows="7"
                  style={{width:'90%'}}
                  placeholder="Сообшение в чат..."
                  onKeyUp={this.handleSubmit}
        /><br/>
        <button onClick={this.handleSubmit}>Send</button>
      </Paper>
    );
  }
}
InputMessagePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  messages:state.messages
}),{sendMessage})

export default compose(materialWrapper,reduxWrapper,socketConnect)(InputMessagePanel);
