import {takeLatest, put, call, all} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {loginUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {LOGIN_USER, LOGIN_SUCCESS, LOAD_USER, LOGIN_FAIL} from 'variables/auth';
import {LOAD_ON, LOAD_OFF} from 'variables/alerts';



function * actionWatcher(action) {
    yield put({type: LOAD_ON});
    const response = yield call(loginUserApi, action.payload);
    const isValid = yield call(validateResponse, response);
    if (isValid) {
        const {token} = response.data;
        yield put({type: LOAD_OFF});
        yield put({type:LOGIN_SUCCESS, payload:{token}})
        yield put(enqueueSnackbar({
            message: 'Logging in successfully',
            options: {
                variant: 'success'
            }
        }));
        yield put({type: LOAD_USER})
    } else {
        yield put({type: LOAD_OFF});
        yield put({type: LOGIN_FAIL});
        const errors = response.data.errors;
        yield all(errors.map((error) => put(enqueueSnackbar({
            message: error.msg,
            options: {
                variant: 'error'
            }
        }))));
    }
}

export function * loginUserSaga(action) {
    yield takeLatest(LOGIN_USER, actionWatcher);
}