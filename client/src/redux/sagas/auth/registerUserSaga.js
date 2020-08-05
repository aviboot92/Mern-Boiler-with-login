import {takeLatest, put, call, all} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {registerUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {REGISTER_USER, REGISTER_SUCCESS, LOAD_USER, REGISTER_FAIL} from 'variables/auth';
import {LOAD_ON, LOAD_OFF} from 'variables/alerts';



function * actionWatcher(action) {
    yield put({type: LOAD_ON});
    const response = yield call(registerUserApi, action.payload);
    const isValid = yield call(validateResponse, response);
    if (isValid) {
        const {token} = response.data;
        yield put({type: LOAD_OFF});
        yield put({type:REGISTER_SUCCESS, payload:{token}})
        yield put(enqueueSnackbar({
            message: 'User is created successfully',
            options: {
                variant: 'success'
            }
        }));
        yield put({type: LOAD_USER})
    } else {
        yield put({type: LOAD_OFF});
        yield put({type: REGISTER_FAIL});
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