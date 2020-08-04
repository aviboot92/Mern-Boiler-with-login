import React from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import configureStore, {sagaMiddleware} from './redux/store';
import {Provider} from 'react-redux';
import mySaga from 'redux/sagas';
import Landing from 'layouts/Landing';
import Register from 'views/Auth/Register';
import Login from 'views/Auth/Login';
import Snackbar from "components/Snackbar/Notifier";
import 'assets/scss/app-styles/styles.scss';
// import AuthLayout from "views/Login/LoginWrapper";
import Tester from 'components/Tester';
import AdminLayout from "layouts/Admin";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const store = configureStore();
const history = createBrowserHistory();
sagaMiddleware.run(mySaga);

const App = () => (
    <Provider store={store}>
        <SnackbarProvider maxSnack={3} dense>
        <Snackbar />
        {/* <Tester /> */}
        <Router history={history}>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route path="/admin" component={AdminLayout}/>
            </Switch>
        </Router>
        </SnackbarProvider>
    </Provider>
);

export default App;
