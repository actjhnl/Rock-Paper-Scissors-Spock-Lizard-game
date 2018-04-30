import { combineReducers } from 'redux';
import * as act from '../constants';
export default combineReducers({
  socket:(state={},action)=>{
    const {type} = action;
    switch(type){
      case act.INIT_SOCKET:
        return Object.assign({},action.socket);
      default: return state;
    }
  },
})
