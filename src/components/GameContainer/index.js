import React, { Component } from 'react';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
import {
  Header,SideBarChat,InputMessagePanel,
  MainGameScreen,GesturesBar
} from '../'
//material-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import {styles} from './GameContainerStyles';
/**
 * Родительский компонент для всех компонентов игровой зоны.
 * Отображение зависит от состояния "start"
 */
class GameContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <Header />
          <SideBarChat />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <MainGameScreen />
            <GesturesBar />
            <InputMessagePanel />
          </main>
        </div>
      </div>
    );
  }
}
GameContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
const materialWrapper = withStyles(styles);
export default compose(materialWrapper,socketConnect)(GameContainer);
