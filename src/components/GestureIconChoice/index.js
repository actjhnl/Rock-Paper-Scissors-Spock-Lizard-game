import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendGesture,makeChoiceGesture} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Button} from 'material-ui';

import {styles} from './GestureIconChoiceStyle';

import * as i from '../../img';

class GesturesBar extends Component {
  handleGesture = (gesture) =>{
    if(this.props.choice) return;
    const {socket} = this.props;
    const act = {
      gesture:gesture,
      from:this.props.socket.id
    }
    this.props.sendGesture(act);
    socket.emit('gesture',gesture);
    this.props.makeChoiceGesture(gesture);
  }
  render() {
    const {classes,choice} = this.props;
    const stl = this.props.choosen ? classes.choosen : choice ? classes.disabled : classes.active
    return (
      <div className={stl} onClick={()=>this.handleGesture(this.props.gesture)}>
        <img className={classes.img} src={this.props.url} alt={this.props.gesture}/>
      </div>
    );
  }
}
GesturesBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  gestures:state.gestures,
  choice: state.choice
}),{sendGesture,makeChoiceGesture})

export default compose(materialWrapper,reduxWrapper,socketConnect)(GesturesBar);
