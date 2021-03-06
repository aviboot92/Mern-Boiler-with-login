import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import routesConfig from "routes.js";

const routes = routesConfig.authRoutes;

const switchRoutes = (
    <Switch>
        {routes.map((route, key) => {
            return <Route
                exact
                path={route.layout + route.path}
                component={route.component}
                key={key}/>
        })
}
        <Redirect from="/auth" to="/auth/login"/>
    </Switch>
);

const AuthRoutes = () => ( <> {
    switchRoutes
} </>
);

export default AuthRoutes;