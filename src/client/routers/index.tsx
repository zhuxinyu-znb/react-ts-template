import * as React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import AnimatedRouter from '@components/animation/AnimatedRouter';
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

const Demo2 = Loadable({
  loader: () => import(/* webpackChunkName: "demo" */ "@pages/demo2"),
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
    component: Menu,
    children: [
      {
        key: 'demo1',
        path: '/demo/demo1',
        component: Demo,
        exact: true
      },
      {
        key: 'demo2',
        path: '/demo/demo2',
        component: Demo2,
        exact: true
      },
    ]
  },
];

// const Router = () => (
//   <Suspense fallback={Loading}>
//     <Switch>
//       <Route path="/report" component={Report} />
//       <Route  path="/demo" render={
//         props => (
//           <Menu>
//             <Route path="/demo/demo1" component={Report} />
//             <Route path="/demo/demo2" component={NoMatch} />
//           </Menu>
//         )
//       }
//       />
//       <Route component={NoMatch} />
//     </Switch>
//   </Suspense>
// );

const generateRoutes = (routeConfig: JYDProps[]) => (
  <Suspense fallback={Loading}>
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/login" />} key="/home" />
      {
        routeConfig.map((r, i: number) => {
          const { path, component, exact, key } = r;
          const LazyCom = component;
          return (
            <Route
              key={key}
              path={path}
              exact={exact}
              render={props => {
                if (!r.children || !r.children.length) return <LazyCom {...props} />
                return (
                  <LazyCom {...props}>
                    {
                      r.children.map(child => {
                        const { key, path, exact, component } = child
                        const ChildCMP = component
                        return <Route
                          key={key}
                          path={path}
                          render={props => <ChildCMP {...props} />}
                        />
                      })
                    }
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
