import {put, delay, takeEvery} from "redux-saga/effects";
import {AGE_UP} from 'variables/testVariables';
import {ENQUEUE_SNACKBAR} from 'variables/alerts';

const notification = {
    message: 'Age Up.',
    options: {
        variant: 'warning'
    }
}

function * ageUpAsync() {
    yield put({
        type: ENQUEUE_SNACKBAR,
        notification
    })
    yield put({type: "AGE_UP_ASYNC", value: 1});
}

export function * watchAgeUp() {
    yield takeEvery(AGE_UP, ageUpAsync);
}
