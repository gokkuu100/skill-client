// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // You need to create an auth reducer

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers as needed
});

export default rootReducer;
