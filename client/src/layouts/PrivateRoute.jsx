import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

const PrivateRoute = ({
    component: Component,
    ...rest
}) =>{ 
    const isAuthenticated = useSelector(store => store.auth.isAuthenticated);
    const loading = useSelector(store => store.alerts.loading);
    return (
    <Fragment>
        <Route
            {...rest}
            render={props => !isAuthenticated && !loading
            ? (<Redirect to="/auth/login"/>)
            : (<Component {...props}/>)}/>
    </Fragment>
)}

export default PrivateRoute;
