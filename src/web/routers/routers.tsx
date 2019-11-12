import * as React from "react";
import { RouteProps } from "react-router-dom";
import Login from "@pages/login";
import NoMatch from "@components/NoMatch";
const { lazy } = React;

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

export default routeConfig;
