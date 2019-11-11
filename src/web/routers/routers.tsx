import * as React from "react";
import { RouteProps } from "react-router-dom";
import Login from "@pages/login";
const { lazy } = React;
const Report = lazy(() =>
  import(/* webpackChunkName: "report" */ "@pages/report")
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
  }
];

export default routeConfig;
