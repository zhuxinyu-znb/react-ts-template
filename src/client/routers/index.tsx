import * as React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import Loading from "@components/Loading";
import Login from "@pages/login";
import NoMatch from "@components/NoMatch";
import Map from '@pages/map';
import Report from '@pages/report';
import Menu from '@components/Menu';
const { Suspense } = React;

interface JYDProps extends RouteProps {
  key: string,
  auth?: boolean,
  children?: any
}

// const Report = Loadable({
//   loader: () => import(/* webpackChunkName: "report" */ "@pages/report"),
//   loading: Loading,
//   delay: 300,
// });

const Demo = Loadable({
  loader: () => import(/* webpackChunkName: "demo" */ "@pages/demo"),
  loading: Loading,
  delay: 300,
});

const routeConfig: JYDProps[] = [
  {
    key: 'login',
    path: "/login",
    exact: true,
    component: Login
  },
  {
    key: 'report',
    path: "/report",
    exact: true,
    component: Report
  },
  {
    key: 'map',
    path: "/map",
    exact: true,
    component: Map
  },
  {
    key: 'demo',
    path: "/demo",
    exact: true,
    component: Menu,
    children: [
      {
        key: 'demo1',
        path:'/demo',
        component:Demo,
        exact:true
      },
    ]
  },
];

const generateRoutes = (routeConfig: JYDProps[]) => (
  <Suspense fallback={Loading}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/login" />} key="/home" />,
      {
        routeConfig.map((r, i: number) => {
          const { path, component, exact, key } = r;
          const LazyCom = component;
          return (
            <Route
              key={key}
              exact={exact}
              path={path}
              render={props => {
                if (!r.children || !r.children.length) return <LazyCom {...props} />
                return (
                  <LazyCom {...props}>
                    <Switch>
                      {
                        r.children.map(child => {
                          const { key, path, exact, component } = child
                          const ChildCMP = component
                          return <Route
                            key={key}
                            path={path}
                            exact={exact}
                            render={props => <ChildCMP {...props} />}
                          />
                        })
                      }
                      <Redirect to={r.children[0].path}/>
                    </Switch>
                  </LazyCom>
                )
              }
              }
            />
          );
        })
      }
      <Route component={NoMatch} />
    </Switch>
  </Suspense>
);

const Routes = generateRoutes(routeConfig);

export default Routes;
