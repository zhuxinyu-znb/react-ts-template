import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routeConfig from "./routers";
const { Suspense } = React;

const createRoute = (routeConfig) => {
  if (routeConfig.length === 0) {
    return null;
  }
  return routeConfig.map((r, i) => {
    const { path, component, exact, auth } = r;
    return <Route key={i} path={path} component={component} exact={exact} />;
  });
};

const Router = () => (
  <>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Switch>{createRoute(routeConfig)}</Switch>
      </Suspense>
    </BrowserRouter>
  </>
);

export default Router;
