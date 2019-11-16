import * as React from "react";
import { Switch, Route, RouteProps } from "react-router-dom";
import Loading from "@components/Loading";
import Login from "@pages/login";
import NoMatch from "@components/NoMatch";
const { Suspense, lazy } = React;

const Report = lazy(() =>
  import(/* webpackChunkName: "report" */ "@pages/report")
);
const Home = lazy(() =>
  import(/* webpackChunkName: "home" */ "@pages/home")
);

interface YDProps extends RouteProps {
  auth?: boolean;
}

const routeConfig: YDProps[] = [
  {
    path: "/login",
    exact: true,
    component: Login
  },
  {
    path: "/report",
    exact: true,
    component: Report
  },
  {
    path: "/home",
    exact: true,
    component: Home
  },
  {
    path: "/404",
    component: NoMatch
  }
];

interface YDProps extends RouteProps {
  auth?: boolean;
}


const generateRoutes = (routeConfig: YDProps[]) => store => (
  <Suspense fallback={Loading}>
    <Switch>{
      routeConfig.map((r, i: number) => {
        const { path, component, exact } = r;
        const LazyCom = component;
        return (
          <Route
            key={i}
            exact={exact}
            path={path}
            render={props =>
              r.auth ? <LazyCom {...props} store={store} /> : <LazyCom {...props}  store={store} />
            }
          />
        );
      })
    }</Switch>
  </Suspense>
);


const Routes = generateRoutes(routeConfig);

export default Routes;
