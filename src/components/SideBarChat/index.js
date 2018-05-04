import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {Message} from '../';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Drawer,List,Typography,AppBar,Toolbar } from 'material-ui';

import {styles} from './SideBarChatStyle'
/**
 * Компонент отображения чата между игроками в комнате
 */
class SideBarChat extends Component {
  render() {
    const {classes} = this.props;
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
          {this.props.messages.map((message, index) => {
            return (
              <Message who={message.from} message={message.body}  key={index} />
            )
          })}
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
}),{})

export default compose(materialWrapper,reduxWrapper)(SideBarChat);
