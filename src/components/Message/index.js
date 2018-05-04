import React, { Component } from 'react';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Typography} from 'material-ui';

import {styles} from './MessageStyle'
/**
 * Дочерний компонент компонента SideBarChat.
 * Отображает сообщение пользователя
 */
class Message extends Component {
  render() {
    const {classes} = this.props;
    const stl = this.props.who === 'You' ? classes.you : classes.opponent;
    return (
      <div className={stl}>
        <Typography className={classes.title} color="textSecondary">
          {this.props.who}
        </Typography>
        <Typography variant="headline">
          {this.props.message}
        </Typography>
      </div>
    );
  }
}
Message.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Message);
