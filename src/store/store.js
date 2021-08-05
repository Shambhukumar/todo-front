import {createStore, combineReducers, applyMiddleware} from "redux";
import auth from "./reducer/auth";
import thunk from "redux-thunk";
const middleware = [thunk];
const reducer = combineReducers({ user: auth});
const Store = createStore(reducer, applyMiddleware(...middleware));
export default Store;