import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import allUserReducer from './allUserReducers';
import cartReducer from './cartReducers';
import displayCartReducer from './displayCartReducer';

const myReducers = combineReducers({
    user: userReducer,
    alert: alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
    cart: cartReducer,
    isCart: displayCartReducer,
});

export default myReducers;