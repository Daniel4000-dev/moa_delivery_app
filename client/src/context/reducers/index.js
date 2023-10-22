import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import allUserReducer from './allUserReducers';

const myReducers = combineReducers({
    user: userReducer,
    alert: alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
});

export default myReducers;