import { takeLatest, put, delay, takeEvery } from "redux-saga/effects";


function* ageDownSync() {
    yield delay(1000);
    yield put({ type: "AGE_DOWN_SYNC", value: 1 });
  }

  export function* watchAgeDown() {
    yield takeLatest("AGE_DOWN", ageDownSync);
  }