import React from "react";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import configureStore, {sagaMiddleware} from './redux/store';
import {Provider} from 'react-redux';
import mySaga from 'sagas';
import Landing from 'layouts/Landing';
import Register from 'views/Auth/Register';
import 'assets/scss/app-styles/styles.scss';
// import AuthLayout from "views/Login/LoginWrapper";
import AdminLayout from "layouts/Admin";
import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const store = configureStore();
const hist = createBrowserHistory();
sagaMiddleware.run(mySaga);

const App = () => (
    <Provider store={store}>
        <Router history={hist}>
            <Switch>
                {/* <Route path="/auth" component={AuthLayout}/> */}
                <Route exact path='/' component={Landing}/>
                {/* <Route exact path='/login' component={Login}/> */}
                <Route exact path='/register' component={Register}/>
                <Route path="/admin" component={AdminLayout}/> {/* <Redirect from="/" to="/admin/dashboard"/> */}
            </Switch>
        </Router>
    </Provider>
);

export default App;