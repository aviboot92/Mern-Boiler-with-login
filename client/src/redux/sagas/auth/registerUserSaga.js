import {takeLatest, put, call, all} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {registerUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {REGISTER_USER} from 'variables/auth';

const notification = {
    message: 'Age Down.',
    options: {
        variant: 'success'
    }
}
function * actionWatcher(action) {
    const response = yield call(registerUserApi, action.payload);
    const isValid = yield call(validateResponse, response);
    console.log(response, `outside`);
    if (isValid) {
        yield put(enqueueSnackbar(notification));
    } else {
        console.log(response, `inside`);
        const errors = response.data.errors;
        yield all(errors.map((error) => put(enqueueSnackbar({
            message: error.msg,
            options: {
                variant: 'error'
            }
        }))));
    }
}

export function * registerUserSaga(action) {
    yield takeLatest(REGISTER_USER, actionWatcher);
}