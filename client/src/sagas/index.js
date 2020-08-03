import { all, fork } from "redux-saga/effects";

// ==========Actual my code starts here=================

import * as testSampleSagas from "./testSampleSagas";


export default function* rootSaga() {
  yield all(
    [
      ...Object.values(testSampleSagas),
      // ...Object.values(testSampleSagas)
    ].map(fork)
  );
}
