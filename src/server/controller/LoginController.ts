import * as Router from "koa-router";
import { route, GET } from "awilix-koa";
const ReactDomServer = require('react-dom/server');
const App = require('../dist/server');

@route("/report")
export default class LoginController {
  @GET()
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {

    const appString = ReactDomServer.renderToString(App('/report'));
    console.log(appString)
    let result = await ctx.render("index");
    ctx.body = result.replace('<App />', appString);
  }
}
