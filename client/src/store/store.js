import { combineReducers, applyMiddleware, createStore } from 'redux';//, compose
import thunk from 'redux-thunk';
import {contacts} from "./contactReducer";


const appReducer = combineReducers(
  {
    contactsList:contacts
  }
);
const rootReducer = (state, action) => {
  return appReducer(state, action);
}

const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;
export default store;