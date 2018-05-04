import React, { Component } from 'react';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import { socketConnect } from 'socket.io-react';
import {sendGesture,makeChoiceGesture} from '../../AC';
import * as e from '../../constants';
import * as i from '../../img';
import {styles} from './GestureIconChoiceStyle';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
/**
 * Дочерний компонент компонента GestureBar.
 * Отображает отдельную иконку на панели выбора жеста
 */
class GestureIconChoice extends Component {
  handleGesture = (gesture) =>{
    if(this.props.choice) return;
    const {socket} = this.props;
    const act = {
      gesture:gesture,
      from:this.props.socket.id
    }
    this.props.sendGesture(act);
    socket.emit(e.GESTURE,gesture);
    this.props.makeChoiceGesture(gesture);
  }
  render() {
    const {classes,choice,gesture,url} = this.props;
    const stl = this.props.choosen ?
      classes.choosen :
      choice ?
      classes.disabled :
      classes.active;
    return (
      <div className={stl} onClick={()=>this.handleGesture(gesture)}>
        <img className={classes.img} src={url} alt={gesture}/>
      </div>
    );
  }
}
GestureIconChoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>({
  choice: state.choice
}),{sendGesture,makeChoiceGesture})

export default compose(materialWrapper,reduxWrapper,socketConnect)(GestureIconChoice);
