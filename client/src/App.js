import React, {useEffect} from "react";
import {Router, Route, Switch} from "react-router-dom";
import {SnackbarProvider} from 'notistack';
import configureStore, {sagaMiddleware} from './redux/store';
import {Provider} from 'react-redux';
import mySaga from 'redux/sagas';
import Landing from 'views/Auth/Landing';
import Register from 'views/Auth/Register';
import Login from 'views/Auth/Login';
import Snackbar from "components/Snackbar/Notifier";
import 'assets/scss/app-styles/styles.scss';
// import AuthLayout from "views/Login/LoginWrapper";
import Tester from 'components/Tester';
import AdminLayout from "layouts/Admin";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";
import setAuthToken from './utils/setAuthToken';
import {Button} from '@material-ui/core';
import {loadUser} from 'redux/actions/auth';
import history from 'historyConfig';

const store = configureStore();
sagaMiddleware.run(mySaga);

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {

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
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/register' component={Register}/>
                    </Switch>
                    <Route path="/admin" component={AdminLayout}/>
                </Router>
            </SnackbarProvider>
        </Provider>
    )
};

export default App;
