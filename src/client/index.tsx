import * as React from "react";
import * as ReactDOM from "react-dom";
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import Router from "./routers";
import "@assets/styles/common.css";
import { BrowserRouter } from "react-router-dom";
import { message, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ErrorBoundary from '@components/Error'


message.config({ duration: 2 })
window.message = message;

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/">
        <ConfigProvider locale={zhCN}>
          {Router}
        </ConfigProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

ReactDOM.hydrate(<App />, document.getElementById("app"));


// if (module.hot) {
//   module.hot.dispose(function () {
//     // 模块即将被替换时
//     console.log("module will be replaced");
//   });

//   module.hot.accept(function () {
//     // 模块或其依赖项之一刚刚更新时
//     console.log("module update");
//   });
// }

