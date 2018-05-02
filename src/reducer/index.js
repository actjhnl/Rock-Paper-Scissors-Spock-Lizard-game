import { combineReducers } from 'redux';
import * as act from '../constants';
export default combineReducers({
  start:(state=false,action)=>{
    return action.type === act.START_GAME ? !state: state;
  },
  messages:(messages=[],action)=>{
    const {type} = action;
    switch(type){
      case act.NEW_MESSAGE:
        const {message} = action;
        return [message, ...messages];
      default: return messages;
    }
  },
  gestures:(gestures=[],action)=>{
    const {type} = action;
    switch(type){
      case act.SHOW_GESTURE:
        const {gesture} = action;
        return [...gestures,gesture];
      default: return gestures;
    }
  },
})
