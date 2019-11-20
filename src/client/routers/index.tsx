import * as React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
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
const Demo1 = lazy(() =>
  import(/* webpackChunkName:"demo1" */ "@components/Demo1")
);
const Demo2 = lazy(() =>
  import(/* webpackChunkName:"demo2" */ "@components/Demo2")
);

interface YDProps extends RouteProps {
  key: string,
  auth?: boolean,
  children?: any
}

const routeConfig: YDProps[] = [
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
    key: 'home',
    path: "/home",
    exact: true,
    component: Home,
    children: [
      {
        key: 'demo1',
        path: '/home/demo1',
        component: Demo1,
        exact: true
      },
      {
        key: 'demo2',
        path: '/home/demo2/:id',
        component: Demo2,
        // exact:true
      },
    ]
  },
];



const generateRoutes = (routeConfig: YDProps[]) => store => (
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
                if (!r.auth) return <LazyCom {...props} />
                if (!store.token) {
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: props.location }
                      }}
                    />
                  )
                }
                if (!r.children || !r.children.length) {
                  return <LazyCom {...props} store={store} />
                }
                return (
                  <LazyCom props={props} store={store}>
                    <Switch>
                      {
                        r.children.map(child => {
                          const { key, path, exact, component } = child
                          const ChildCMP = component
                          return <Route
                            key={key}
                            path={path}
                            exact={exact}
                            render={props => <ChildCMP {...props} store={store} />}
                          />
                        })
                      }
                      <Redirect to={r.children[0].path} />
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
