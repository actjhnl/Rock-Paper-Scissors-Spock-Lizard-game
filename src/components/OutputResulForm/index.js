import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import {} from 'material-ui';
//import ExitToApp from '@material-ui/icons/ExitToApp';

import {styles} from './OutputResultStyle'

//обект типа ключ - жест, значение - массив жест, которые он бьет
const GESTURES = {
  "Rock":["Scissors","Lizard"],
  "Paper":["Rock","Spock"],
  "Scissors":["Paper","Lizard"],
  "Lizard":["Paper","Spock"],
  "Spock":["Rock","Scissors"]
}
class OutputResulForm extends Component {
  // handleClick = () => {
  //   this.props.
  // }
  render() {
    const {classes,gestures,socket} = this.props;
    //winner detection
    let resultGame = '';
    if(gestures.length > 1){
      gestures[0].gesture === gestures[1].gesture ?
        resultGame = "Ничья"
      : GESTURES[gestures[0].gesture].includes(gestures[1].gesture) ? // типа искать будем по массивчеку жеста первого ответившего игрока
                                                                      // ищем жест второго игрока в массиве выграшых жестов первого
        resultGame = gestures[0].from // такой жест найден, значит первый победил
      :
        resultGame = gestures[1].from // такого жеста нет, значит второй победил
    }
    const body = (
      resultGame &&
      <div>
        <h1>{resultGame === "Ничья" ? "Ничья" : resultGame===this.props.socket.id?"You win" : "You lose"}</h1>
        <button onClick={this.handleClick}>Again</button>
      </div>
    )
    return (
      <div>
        {body}
      </div>
    );
  }
}
OutputResulForm.propTypes = {
  classes: PropTypes.object.isRequired,
};
const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  gestures:state.gestures
}),{})
export default compose(reduxWrapper,materialWrapper,socketConnect)(OutputResulForm);
