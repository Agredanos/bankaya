import { combineReducers } from 'redux';
import * as reducerPrincipal from './principal';
export default combineReducers(Object.assign(
    reducerPrincipal
));