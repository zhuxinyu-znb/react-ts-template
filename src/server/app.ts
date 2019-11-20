import * as Koa from "koa";
import config from "./config";
import * as bodyParser from "koa-bodyparser";
// 创建服务实例
const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
  ctx.body = ctx.request.body;
});

app.listen(config.port, () => {
  console.log(`数据监控系统🍺，server is running on port${config.port}`);
});
