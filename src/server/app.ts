import * as Koa from "koa";
import config from "./config";
import loadMiddlewares from './middleware/loadMiddleware'

// 创建服务实例
const app = new Koa()

// 加载中间件
loadMiddlewares(app)

app.listen(config.port, () => {
  console.log(`数据监控系统🍺，server is running on port${config.port}`);
});
