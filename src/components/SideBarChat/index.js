import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {sendMessage} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Drawer,Divider,List} from 'material-ui';

import {styles} from './SideBarChatStyle'

class SideBarChat extends Component {
  render() {
    const {classes} = this.props;
    const messages = this.props.messages.map((message, index) => {
      return <li key={index}>
        <b>{message.from}: {message.body}</b>
      </li>
    });
    return (
      <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {messages}
        </List>
      </Drawer>
    );
  }
}
SideBarChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  messages:state.messages
}),{sendMessage})

export default compose(materialWrapper,reduxWrapper)(SideBarChat);
