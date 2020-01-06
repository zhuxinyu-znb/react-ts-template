import * as React from "react";
import Routes from "./routers/server-route";
import { StaticRouter } from "react-router-dom";
import ErrorBoundary from '@components/Error'
// url 通过后端获取匹配的路由，获取到相应的组件
// App 作为一个函数交给server端执行
const App = (url: string) => {
  console.log('url', url)
  return (
    <ErrorBoundary>
      <StaticRouter location={url}>
        {Routes}
      </StaticRouter>
    </ErrorBoundary>
  )
};
export default App;
