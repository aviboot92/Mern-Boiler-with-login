import { takeLatest, put, delay, takeEvery } from "redux-saga/effects";

function* ageUpAsync() {
  yield delay(3000);
  yield put({ type: "AGE_UP_ASYNC", value: 1 });
}



export function* watchAgeUp() {
  yield takeEvery("AGE_UP", ageUpAsync);
}

  