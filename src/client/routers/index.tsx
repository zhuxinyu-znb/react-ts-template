import * as React from "react";
import { BrowserRouter, Switch, Route, RouteProps } from "react-router-dom";
import routeConfig from "./routers";
import Loading from "@components/Loading";
const { Suspense } = React;
interface YDProps extends RouteProps {
  auth?: boolean;
}

const createRoute = (routeConfig: YDProps[]) => {
  if (routeConfig.length === 0) {
    return null;
  }
  return routeConfig.map((r, i: number) => {
    const { path, component, exact } = r;
    const LazyCom = component;
    return (
      <Route
        key={i}
        exact={exact}
        path={path}
        render={props =>
          r.auth ? <LazyCom {...props} /> : <LazyCom {...props} />
        }
      />
    );
  });
};

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={Loading}>
      <Switch>{createRoute(routeConfig)}</Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
