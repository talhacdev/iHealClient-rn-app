import {combineReducers} from 'redux';
import authReducer from './authReducer';
import locationsReducer from './locationsReducer';
import vehiclesReducer from './vehiclesReducer';
import ordersReducer from './ordersReducer';
import {appReducer} from './app';
const reducers = combineReducers({
  authReducer,
  locationsReducer,
  vehiclesReducer,
  ordersReducer,
  appReducer,
});
export default reducers;
