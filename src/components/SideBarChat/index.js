import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {sendMessage} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Drawer,Divider,List,Typography,AppBar,Toolbar } from 'material-ui';

import {styles} from './SideBarChatStyle'

class SideBarChat extends Component {
  render() {
    const {classes} = this.props;
    const messages = this.props.messages.map((message, index) => {
      const stl = message.from === 'You' ? classes.you : classes.opponent;
      return (
        <div className={stl} key={index}>
          <Typography className={classes.title} color="textSecondary">
            {message.from}
          </Typography>
          <Typography variant="headline">
            {message.body}
          </Typography>
        </div>
      )
    });
    return (
      <Drawer variant="permanent" classes={{paper: classes.drawerPaper,}}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <List className={classes.listMessage}>
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
