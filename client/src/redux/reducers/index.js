import { combineReducers } from "redux";
import TestSampleReducer from "./testSampleReducer";
import Alerts from "./alerts";

const rootReducer = combineReducers({
  TestSampleReducer,
  Alerts
});

export default rootReducer;
