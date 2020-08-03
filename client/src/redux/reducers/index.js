import { combineReducers } from "redux";
import TestSampleReducer from "./testSample/testSampleReducer";

const rootReducer = combineReducers({
  TestSampleReducer,
});

export default rootReducer;
