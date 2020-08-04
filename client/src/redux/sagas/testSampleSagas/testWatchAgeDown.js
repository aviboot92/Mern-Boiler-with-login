import {AGE_DOWN} from 'variables/testVariables';
import { takeLatest, put, delay} from "redux-saga/effects";


function* ageDownSync() {
    yield delay(1000);
    yield put({ type: "AGE_DOWN_SYNC", value: 1 });
  }

  export function* watchAgeDown() {
    yield takeLatest(AGE_DOWN, ageDownSync);
  }