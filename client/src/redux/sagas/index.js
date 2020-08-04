import { all, fork } from "redux-saga/effects";

// ==========Actual my code starts here=================

import * as testSampleSagas from "./testSampleSagas";
import * as authSagas from './auth';

export default function* mySaga() {
  yield all(
    [
      ...Object.values(testSampleSagas),
      ...Object.values(authSagas)
    ].map(fork)
  );
}
