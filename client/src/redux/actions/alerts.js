import {ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR} from 'variables/alerts';

export const enqueueSnackbar = (notification) => dispatch => {
    const key = notification.options && notification.options.key;
    dispatch({
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random()
        }
    });
};

export const closeSnackbar = key => dispatch => (dispatch({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key
}));

export const removeSnackbar = key => dispatch => ({type: REMOVE_SNACKBAR, key});