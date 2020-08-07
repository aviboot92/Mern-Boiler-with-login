import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routesConfig from "routes.js";

const routes = routesConfig.authRoutes;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
        
    })}
  </Switch>
);