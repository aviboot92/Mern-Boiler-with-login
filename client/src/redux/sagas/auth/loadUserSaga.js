import {takeLatest, put, call} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {loadUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {LOAD_USER, USER_LOADED, AUTH_ERROR} from 'variables/auth';
import {LOAD_ON, LOAD_OFF} from 'variables/alerts';


function * actionWatcher(action) {
    yield put({type: LOAD_ON});
    const response = yield call(loadUserApi);
    const isValid = yield call(validateResponse, response);
    if (isValid) {
        yield put({type: USER_LOADED, payload: response.data});
        yield put({type: LOAD_OFF});
    } else {
        yield put({type: AUTH_ERROR});
        yield put({type: LOAD_OFF});
        yield put(enqueueSnackbar({
            message: 'Authorization Error, Please Sign In again.',
            options: {
                variant: 'warning'
            }
        }));
    }
}

export function * loadUserSaga(action) {
    yield takeLatest(LOAD_USER, actionWatcher);
}