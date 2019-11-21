import * as Router from "koa-router";
import { route, GET } from "awilix-koa";
import User from "../model/user";

@route("/")
@route("/index")
export default class IndexController {
  private indexService: any
  constructor({ indexService }) {
    this.indexService = indexService;
  }
  @route("/")
  @GET()
  private async index(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    console.log(1111);
    const result: User = await this.indexService.getUser("0");
    console.log(result.email);
    // ctx.body = await ctx.render("index", { data: result.email });
  }
}
