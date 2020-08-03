import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
}
