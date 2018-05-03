import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendGesture,makeChoiceGesture} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Button} from 'material-ui';

import {styles} from './GesturesBarStyle';

import * as i from '../../img';

const ROCK = "Rock",
      PAPER = "Paper",
      SCISSORS = "Scissors",
      LIZARD = "Lizard",
      SPOCK = "Spock";

class GesturesBar extends Component {
  handleGesture = (gesture) =>{
    const {socket} = this.props;
    const act = {
      gesture:gesture,
      from:this.props.socket.id
    }
    this.props.sendGesture(act);
    socket.emit('gesture',gesture);
    this.props.makeChoiceGesture();
  }
  componentDidMount(){
    this.props.socket.on('result',(act)=>{
      this.props.sendGesture(act);
    })
  }
  render() {
    const {classes,choice} = this.props;
    return (
      <div className={classes.gestureBar}>
        <div className={classes.gesture} onClick={()=>this.handleGesture(ROCK)}>
          <img className={classes.img} src={i.rock} alt={"rock"}/>
        </div>
        <div className={classes.gesture} onClick={()=>this.handleGesture(PAPER)}>
          <img className={classes.img} src={i.paper} alt={"paper"}/>
        </div>
        <div className={classes.gesture} onClick={()=>this.handleGesture(SCISSORS)}>
          <img className={classes.img} src={i.scissors} alt={"scissors"}/>
        </div>
        <div className={classes.gesture} onClick={()=>this.handleGesture(LIZARD)}>
          <img className={classes.img} src={i.lizard} alt={"lizard"}/>
        </div>
        <div className={classes.gesture} onClick={()=>this.handleGesture(SPOCK)}>
          <img className={classes.img} src={i.spock} alt={"spock"}/>
        </div>
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
