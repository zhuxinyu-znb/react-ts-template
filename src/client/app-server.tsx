import * as React from "react";
import routes from "./routers/index";
import { StaticRouter } from "react-router-dom";
import YdStore from '@models/store';
const { useContext } = React;
// url 通过后端获取匹配的路由，获取到相应的组件
// App 作为一个函数交给server端执行
const App = (url: string) => {
  const ydStore = useContext(YdStore)
  return (
    <StaticRouter location={url}>
      {routes(ydStore)}
    </StaticRouter>
  )
};
export default App;
