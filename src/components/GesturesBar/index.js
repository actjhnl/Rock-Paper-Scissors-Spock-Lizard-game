import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendGesture,makeChoiceGesture} from '../../AC';
import {GestureIconChoice} from '../'
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
const gestureImages = [
  {
    url: i.rock,
    gesture: ROCK
  },
  {
    url: i.paper,
    gesture:PAPER
  },
  {
    url: i.scissors,
    gesture: SCISSORS
  },
  {
    url: i.lizard,
    gesture: LIZARD
  },
  {
    url: i.spock,
    gesture:SPOCK
  }

];
class GesturesBar extends Component {
  componentDidMount(){
    this.props.socket.on('result',(act)=>{
      this.props.sendGesture(act);
    })
  }
  render() {
    const {classes,choice} = this.props;

    const icon = gestureImages.map((value)=>{
      return <GestureIconChoice
                  url={value.url}
                  gesture={value.gesture}
                  choosen={value.gesture.includes(choice)} //если выбрана была иконка
            />
    })
    return (
      <div className={classes.gestureBar}>
        {icon}
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
