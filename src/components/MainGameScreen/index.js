import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
//import {} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import {} from 'material-ui';

import {styles} from './MainGameScreenStyle'

class MainGameScreen extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.main}>
        <h2>game screen</h2>
      </div>
    );
  }
}
MainGameScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({

}),{})

export default compose(materialWrapper,reduxWrapper,socketConnect)(MainGameScreen);
