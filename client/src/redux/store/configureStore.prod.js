import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

 function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
}



export default configureStore;
