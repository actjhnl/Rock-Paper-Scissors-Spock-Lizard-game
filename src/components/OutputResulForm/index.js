import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
import {reset} from '../../AC';
import * as e from '../../constants';
import InvitationForm from './';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Button,Paper,Typography} from 'material-ui';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

import {styles} from './OutputResultStyle'
/**
 * Объект правил игры
 * Ключ - Название жеста
 * Значение - Массив названий жестов которые он бьет
 */
const GESTURES = {
  "Rock":["Scissors","Lizard"],
  "Paper":["Rock","Spock"],
  "Scissors":["Paper","Lizard"],
  "Lizard":["Paper","Spock"],
  "Spock":["Rock","Scissors"]
}
/**
 * Дочерний компонент компонента MainGameScreen
 * Отображает результат игры, форму приглашения
 */
class OutputResulForm extends Component {
  state = {
    alone:false,
    open:false
  }
  // отправляет опоненту запрос сыграть еще раз
  handleClick = () => {
    this.props.socket.emit(e.PLAY_INVITATION)
  }
  // на предложение не согласен
  handleCloseDisagree = () => {
    this.setState({ open: false });
    // отправка отказа
    this.props.socket.emit(e.INVITATION_DISAGREE);
  };
  // на предложение согласен
  handleCloseAgree =()=>{
    this.setState({ open: false });
    //отправка согласия
    this.props.socket.emit(e.INVITATION_AGREE);
  }
  componentDidMount(){
    // если соперник покинул комнату
    this.props.socket.on(e.OPPONENT_LEAVE,()=>{
      this.setState({alone:true})
    })
    //пришло приглашение сыграть снова. Открывается форма
    this.props.socket.on(e.PLAY_INVITATION,()=>{
      this.setState({ open: true });
    })
    //оппонент ответил отказом. СДЕЛАТЬ ФОРМУ СООБЩАЮЩУЮ ОБ ЭТОМ
    this.props.socket.on(e.INVITATION_DISAGREE,()=>{
      alert('disagree')
    })
    // оппонент ответил согласием. Сброс прошлой партии.
    this.props.socket.on(e.INVITATION_AGREE,()=>{
      this.props.reset();
    })
  }
  render() {
    const {classes,gestures,socket} = this.props;
    // Определение победителя
    let resultGame = '';
    if(gestures.length > 1){
      gestures[0].gesture === gestures[1].gesture ?
        resultGame = "Ничья" :
        /**
         * Поиск по массиву жеста первого ответившего игрока
         * ищем жест второго игрока в массиве выиграшых жестов первого
         */
        GESTURES[gestures[0].gesture].includes(gestures[1].gesture) ?
        /**
         * такой жест найден, значит первый победил. отправляем id победителя,
         * чтобы потом на этапе проверки вывести соответствующе результату сообщение
         */
        resultGame = gestures[0].from :
        // такого жеста нет, значит второй победил
        resultGame = gestures[1].from
    }
    /**
     * Окно отображения результата игры
     */
    const body = (
      (resultGame || this.state.alone) &&
      <div>
        <Typography variant="headline" component="h1">
          {resultGame ? resultGame === "Ничья" ? "Ничья" : resultGame===this.props.socket.id?"You win!" : "You lose" : "Oops=("}
        </Typography>
        { resultGame && <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick}>Again</Button> }
        <Typography component="p" style={{color:'red'}}>
          {this.state.alone && "Your opponent leaved the room. Before starting new game you should exit"}
        </Typography>
      </div>
    )
    /**
     * Окно приглашения сыграть еще раз
     */
    const invitation = (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Do you want to play again?"}</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleCloseDisagree} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleCloseAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
    return (
      <div>
        {invitation}
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
}),{reset})
export default compose(reduxWrapper,materialWrapper,socketConnect)(OutputResulForm);
