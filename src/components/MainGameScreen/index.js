import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {OutputResulForm} from '../'
import * as i from '../../img';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {styles} from './MainGameScreenStyle'
import './style.css';
/**
 * Компонент главного экрана игры.
 * Отображение жестов, выбранных двумя пользователями
 */
class MainGameScreen extends Component {
  /**
   * Определяет нужную картинку под жесту
   * @param {String} gesture - Название жеста
   * @param {Boolean} num - сторона игрока
   * @return {String} src путь до изображения
   */
  getGestureImg = (gesture, num) => {
    if(gesture === "Rock")
      return num ? i.left_rock : i.right_rock;
    else if(gesture === "Paper")
      return num ? i.left_paper : i.right_paper;
    else if(gesture === "Scissors")
      return num ? i.left_scissors : i.right_scissors;
    else if(gesture === "Lizard")
      return num ? i.left_lizard : i.right_lizard;
    else if(gesture === "Spock")
      return num ? i.left_spock : i.right_spock;
    else return null;
  }
  render() {
    const {classes,gestures,socket} = this.props;
    //display0
    const geture00 = gestures.length > 1 ? this.getGestureImg(gestures[0].gesture,0) : i.right_rock;
    const geture01 = gestures.length > 1 ? this.getGestureImg(gestures[1].gesture,1) : i.left_rock;
    //display1
    const geture10 = gestures.length > 1 ? this.getGestureImg(gestures[0].gesture,1) : i.right_rock;
    const geture11 = gestures.length > 1 ? this.getGestureImg(gestures[1].gesture,0) : i.left_rock;
    // для того чтобы отобразить свой жест всегда слева
    const order = gestures.length > 1 && gestures[0].from === socket.id ? true : false;
    // пара в направлении типа \
    const gesture00Img = <img className={classes.img} src={geture00} alt={"gesture00Img"}/>
    const gesture01Img = <img className={classes.img} src={geture01} alt={"gesture01Img"}/>
    // пара в направлении типа /
    const gesture10Img = <img className={classes.img} src={geture10} alt={"gesture10Img"}/>
    const gesture11Img = <img className={classes.img} src={geture11} alt={"gesture11Img"}/>
    // анимируются только кулаки. Это для их одновременного запуска
    const initStyleLeft = gestures.length > 1 ? classes.pair : `${classes.pair} left`;
    const initStyleRight = gestures.length > 1 ? classes.pair : `${classes.pair} right`;
    // отображаются пары крест накрест
    const body = (
      <div className={classes.block}>
        {/*display 1*/}
        <div className={initStyleLeft}>
          {order ? gesture10Img : gesture01Img}
        </div>
        {/*display 2*/}
        <div className={initStyleRight}>
          {order ? gesture11Img : gesture00Img}
        </div>
      </div>
    );
    return (
      <div className={classes.main}>
        {body}
        <OutputResulForm />
      </div>
    );
  }
}
MainGameScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  gestures:state.gestures
}),{})

export default compose(materialWrapper,reduxWrapper,socketConnect)(MainGameScreen);
