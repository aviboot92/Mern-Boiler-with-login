import {takeLatest, put} from "redux-saga/effects";
import {enqueueSnackbar} from 'redux/actions/alerts';
import {LOGOUT_USER, LOGOUT} from 'variables/auth';
import {LOAD_ON, LOAD_OFF} from 'variables/alerts';
import history from 'historyConfig';

function * actionWatcher(action) {
    yield put({type: LOAD_ON});
    yield put({type: LOGOUT});
    history.push('/');
    yield put({type: LOAD_OFF});
    yield put(enqueueSnackbar({
        message: 'Logged out Successfully',
        options: {
            variant: 'info'
        }
    }));
}


export function * logoutUserSaga(action) {
yield takeLatest(LOGOUT_USER, actionWatcher);
}