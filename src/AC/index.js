import * as act from '../constants'

export function sendMessage(message){
  return {
    type: act.NEW_MESSAGE,
    message:message
  }
}
export function sendGesture(gesture){
  return {
    type: act.SHOW_GESTURE,
    gesture:gesture
  }
}
export function startGame(){
  return {
    type: act.START_GAME,
  }
}
export function showLoader(){
  return {
    type: act.SHOW_LOADER
  }
}
export function reset(){
  return {
    type: act.RESET
  }
}
export function makeChoiceGesture(gesture){
  return {
    type: act.MAKE_A_CHOICE,
    gesture:gesture
  }
}
