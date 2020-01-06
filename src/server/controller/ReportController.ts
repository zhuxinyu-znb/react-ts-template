import * as Router from "koa-router";
import { route, GET } from "awilix-koa";
const ReactDomServer = require('react-dom/server');
const serverEntry = require('../assets/server-entry.js').default;

@route("/report")
export default class LoginController {
  @GET()
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const appString = ReactDomServer.renderToString(serverEntry('/report'));
    let result = await ctx.render("index");
    ctx.body = result.replace('<app id=app></app>', appString);
  }
}
