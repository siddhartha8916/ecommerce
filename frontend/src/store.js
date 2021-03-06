import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./redux/reducers/productReducer";

const reducer = combineReducers({
  products:productReducer,
  productDetails:productDetailsReducer
});

let initialState = {};


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;