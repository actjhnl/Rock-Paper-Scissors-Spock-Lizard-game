import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
import {reset} from '../../AC';
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

//обект типа ключ - жест, значение - массив жест, которые он бьет
const GESTURES = {
  "Rock":["Scissors","Lizard"],
  "Paper":["Rock","Spock"],
  "Scissors":["Paper","Lizard"],
  "Lizard":["Paper","Spock"],
  "Spock":["Rock","Scissors"]
}
class OutputResulForm extends Component {
  state = {
    alone:false,
    open:false
  }
  // отправляеи опоненту запрос сыграть еще раз
  handleClick = () => {
    this.props.socket.emit('playInvitation')
  }
  // на предложение отвечаем отказом
  handleCloseDisagree = () => {
    this.setState({ open: false });
    // отправляю отказ
    this.props.socket.emit('InvitationDisagree');
  };
  // на предложение отвечаем согласием
  handleCloseAgree =()=>{
    this.setState({ open: false });
    //отправляю согласие
    this.props.socket.emit('InvitationAgree');
  }
  componentDidMount(){
    // если соперник покинул комнату
    this.props.socket.on('opponentLeave',()=>{
      this.setState({alone:true})
    })
    //пришло приглашение сыграть снова. Открывается форма
    this.props.socket.on('playInvitation',()=>{
      this.setState({ open: true });
    })
    //опонент ответил отказом. СДЕЛАТЬ ФОРМУ СООБЩАЮЩУЮ ОБ ЭТОМ
    this.props.socket.on('InvitationDisagree',()=>{
      alert('disagree')
    })
    // опонент ответил согласием. Сброс прошлой партии.
    this.props.socket.on('InvitationAgree',()=>{
      this.props.reset();
    })
  }
  render() {
    const {classes,gestures,socket} = this.props;
    //winner detection
    let resultGame = '';
    if(gestures.length > 1){
      gestures[0].gesture === gestures[1].gesture ?
        resultGame = "Ничья"
      : GESTURES[gestures[0].gesture].includes(gestures[1].gesture) ? // типа искать будем по массивчеку жеста первого ответившего игрока
                                                                      // ищем жест второго игрока в массиве выграшых жестов первого
        resultGame = gestures[0].from // такой жест найден, значит первый победил. отправляем id победителя, чтобы потом на этапе проверки вывести соответствующе резкльтату сообщение
      :
        resultGame = gestures[1].from // такого жеста нет, значит второй победил
    }
    const body = (
      (resultGame || this.state.alone) &&
      <div>

          <Typography variant="headline" component="h1">
            {resultGame ? resultGame === "Ничья" ? "Ничья" : resultGame===this.props.socket.id?"You win!" : "You lose" : "Oops=("}
          </Typography>
          {
            resultGame && <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick}>Again</Button>
          }
          <Typography component="p" style={{color:'red'}}>
            {this.state.alone && "Your opponent leaved the room. Before starting new game you should exit"}
          </Typography>

      </div>
    )
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
