import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import { socketConnect } from 'socket.io-react';
import {reset} from '../../AC';
//materal-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Button} from 'material-ui';
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
  handleClick = () => {
    //this.setState({ open: true });
    this.props.socket.emit('playInvitation')
  }
  handleCloseDisagree = () => {
    this.setState({ open: false });
    // отправляю отказ
    this.props.socket.emit('InvitationDisagree');
  };
  handleCloseAgree =()=>{
    this.setState({ open: false });
    //отправляю согласие
    this.props.socket.emit('InvitationAgree');
  }


  componentDidMount(){
    this.props.socket.on('inform',()=>{
      this.setState({alone:true})
    })
    this.props.socket.on('playInvitation',()=>{
      this.setState({ open: true });
    })
    //
    this.props.socket.on('InvitationDisagree',()=>{
      alert('disagree')
    })
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
    const invitation = ( // на кнопку - отсылаю на сервр. мне открывать это оконо не надо. буду только мнять состояние. а закрывать функция нужна
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Хотите сыграть еще?
            </DialogContentText>
          </DialogContent>
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
        {this.state.alone && <h1>Опонент ушел. Выйдите из комнаты чтобы начать новую игру</h1>}
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
