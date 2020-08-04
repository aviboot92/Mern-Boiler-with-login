import { combineReducers } from "redux";
import testSampleReducer from "./testSampleReducer";
import alerts from "./alerts";
import auth from "./auth";

const rootReducer = combineReducers({
  testSampleReducer,
  alerts,
  auth
});

export default rootReducer;
