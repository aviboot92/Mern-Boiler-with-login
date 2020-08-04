import {AGE_DOWN} from 'variables/testVariables';
import {takeLatest, put, delay} from "redux-saga/effects";
import {enqueueSnackbar} from 'redux/actions/alerts';

const notification = {
    message: 'Age Down.',
    options: {
        variant: 'success'
    }
}

function * ageDownSync() {
    yield put(enqueueSnackbar(notification));
    yield delay(1000);
    yield put({type: "AGE_DOWN_SYNC", value: 1});
}

export function * watchAgeDown() {
    yield takeLatest(AGE_DOWN, ageDownSync);
}