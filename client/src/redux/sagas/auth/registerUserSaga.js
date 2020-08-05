import {takeLatest, put, call, all} from "redux-saga/effects";
import {validateResponse} from './../validators';
import {registerUserApi} from 'api/auth';
import {enqueueSnackbar} from 'redux/actions/alerts';
import {REGISTER_USER, REGISTER_SUCCESS} from 'variables/auth';


function * actionWatcher(action) {
    const response = yield call(registerUserApi, action.payload);
    const isValid = yield call(validateResponse, response);
    console.log(response, `outside`);
    if (isValid) {
        const {token} = response.data;
        yield put({type:REGISTER_SUCCESS, payload:{token}})
        yield put(enqueueSnackbar({
            message: 'User is created successfully',
            options: {
                variant: 'success'
            }
        }));
    } else {
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