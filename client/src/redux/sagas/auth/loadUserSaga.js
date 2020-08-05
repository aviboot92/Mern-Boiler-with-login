import {takeLatest, put, call} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {loadUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {LOAD_USER, USER_LOADED, AUTH_ERROR} from 'variables/auth';
import setAuthToken from 'utils/setAuthToken';

function * actionWatcher(action) {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const response = yield call(loadUserApi);
    const isValid = yield call(validateResponse, response);
    if (isValid) {
        yield put({type: USER_LOADED, payload: response.data});
        yield put(enqueueSnackbar({
            message: 'User loaded successfully',
            options: {
                variant: 'info'
            }
        }));
    } else {
        put({type: AUTH_ERROR});
        yield put(enqueueSnackbar({
            message: 'Authorization Error',
            options: {
                variant: 'error'
            }
        }));
    }
}

export function * loadUserSaga(action) {
    yield takeLatest(LOAD_USER, actionWatcher);
}