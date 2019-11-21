import * as Koa from "koa";
import config from "./config";

// 创建服务实例
const app = new Koa();


app.listen(config.port, () => {
  console.log(`数据监控系统🍺，server is running on port${config.port}`);
});
