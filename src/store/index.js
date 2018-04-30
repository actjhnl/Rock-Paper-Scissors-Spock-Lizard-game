import { createStore } from 'redux';
import rootReducer from '../reducer';

const store = createStore(rootReducer);
window.store = store;
export default store;
