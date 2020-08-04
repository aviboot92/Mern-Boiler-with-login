import { combineReducers } from "redux";
import testSampleReducer from "./testSampleReducer";
import alerts from "./alerts";

const rootReducer = combineReducers({
  testSampleReducer,
  alerts
});

export default rootReducer;
