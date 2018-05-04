import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendGesture,makeChoiceGesture} from '../../AC';
import * as e from '../../constants';
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
/**
 * Массив всех необходиых для отображения иконок
 */
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
/**
 * Компонент отображения панели выбора жестов
 */
class GesturesBar extends Component {
  componentDidMount(){
    this.props.socket.on(e.RESULT,(act)=>{
      this.props.sendGesture(act);
    })
  }
  render() {
    const {classes,choice} = this.props;
    return (
      <div className={classes.gestureBar}>
        {gestureImages.map((value)=>{
            return <GestureIconChoice
                    url={value.url}
                    gesture={value.gesture}
                    /*определение выбранного пользователем жеста*/
                    choosen={value.gesture.includes(choice)}
                   />
        })}
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
