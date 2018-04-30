import { combineReducers } from 'redux';
import * as act from '../constants';
export default combineReducers({
  socket:(state={},action)=>{
    const {type} = action;
    switch(type){
      default: return state;
    }
  },
})
