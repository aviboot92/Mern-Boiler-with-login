import React, {useEffect} from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {SnackbarProvider} from 'notistack';
import configureStore, {sagaMiddleware} from './redux/store';
import {Provider} from 'react-redux';
import mySaga from 'redux/sagas';
import Landing from 'views/Auth/Landing';
import Snackbar from "components/Snackbar/Notifier";
import 'assets/scss/app-styles/styles.scss';
import Tester from 'components/Tester';
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import NotFoundPage from "layouts/NotFoundPage";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import setAuthToken from './utils/setAuthToken';
import {Button} from '@material-ui/core';
import {loadUser} from 'redux/actions/auth';
import history from 'historyConfig';

const store = configureStore();
sagaMiddleware.run(mySaga);

const App = () => {
    // It should be outside useEffect of componentDidMount and it will remove token from axios headers if it is not available
    setAuthToken(localStorage.token);
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    // add action to all snackbars
    const notistackRef = React.createRef();
    const onClickDismiss = key => () => {
        notistackRef
            .current
            .closeSnackbar(key);
    }

    return (
        <Provider store={store}>
            <SnackbarProvider
                maxSnack={3}
                dense
                ref={notistackRef}
                autoHideDuration={10000}
                action={(key) => (
                <Button onClick={onClickDismiss(key)}>
                    Dismiss
                </Button>
            )}>
                <Snackbar/> {/* <Tester /> */}
                <Router history={history}>
                        <Route exact path='/' component={Landing}/>
                    <Switch>
                        <Route path="/auth" component={AuthLayout}/>
                        <Route path="/admin" component={AdminLayout}/>
                        <Route path="*" component={NotFoundPage}/>
                    </Switch>
                </Router>
            </SnackbarProvider>
        </Provider>
    )
};

export default App;
