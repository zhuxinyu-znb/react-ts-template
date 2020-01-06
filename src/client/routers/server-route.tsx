import * as React from "react";
import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import Login from "@pages/login";
import NoMatch from "@components/NoMatch";
import Report from '@pages/report';

interface JYDProps extends RouteProps {
  key: string,
  auth?: boolean,
  children?: any
}

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
];

const generateRoutes = (routeConfig: JYDProps[]) => (
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
);

const Routes = generateRoutes(routeConfig);

export default Routes;
