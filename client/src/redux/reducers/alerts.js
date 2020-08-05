import {ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR, LOAD_ON, LOAD_OFF} from 'variables/alerts';

const defaultState = {
    notifications: [],
    loading: false
};

export default(state = defaultState, action) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return {
                ...state,
                notifications: [
                    ...state.notifications, {
                        key: new Date().getTime() + Math.random(),
                        ...action.notification
                    }
                ]
            };

        case CLOSE_SNACKBAR:
            return {
                ...state,
                notifications: state
                    .notifications
                    .map(notification => ((action.dismissAll || notification.key === action.key)
                        ? {
                            ...notification,
                            dismissed: true
                        }
                        : {
                            ...notification
                        }))
            };

        case REMOVE_SNACKBAR:
            return {
                ...state,
                notifications: state
                    .notifications
                    .filter(notification => notification.key !== action.key,)
            };

        case LOAD_ON:
            return {
                ...state,
                loading: true
            }

        case LOAD_OFF:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
};
