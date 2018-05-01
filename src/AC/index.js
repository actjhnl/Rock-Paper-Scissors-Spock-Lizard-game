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
