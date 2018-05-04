import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
import {startGame} from '../../AC';
import {clientUrl} from '../../config.js';
import * as e from '../../constants';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {AppBar,Toolbar,Typography,Button} from 'material-ui';
import ExitToApp from '@material-ui/icons/ExitToApp';

import {styles} from './HeaderStyle'
/**
 * Компонент шапки приложения.
 */
class Header extends Component {
  /**
   * Функция обработки выхода пользователя
   */
  handleClick = () => {
    this.props.socket.emit(e.EXIT);
    this.props.startGame();
    window.location.href = clientUrl;
  }
  render() {
    const {classes} = this.props;
    return (
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" noWrap className={classes.flex}>
            Rock Paper Scissors Spock Lizard game
          </Typography>
          <Button color="inherit" onClick={this.handleClick}>
            Exit
            <ExitToApp />
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
const materialWrapper = withStyles(styles);
const reduxWrapper = connect(null,{startGame})
export default compose(reduxWrapper,materialWrapper,socketConnect)(Header);
