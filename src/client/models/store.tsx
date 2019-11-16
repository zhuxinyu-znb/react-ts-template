import * as React from "react";
import { decorate, observable } from "mobx";

const { createContext } = React;

interface User {
  username: string;
  password: string;
}

export class Ydstore {
  
  public token: string = window.localStorage["token"];
  public userInfo: object;
  public async login(user: User): string {
    const { username, password } = user;
    if (username !== "admin" || password !== "admin") {
      throw new Error("用户名密码错误！");
    }
    this.token = Math.random().toString();
    this.userInfo = { name: "zxy" };
    return this.token;
  }
  public logout(): void {
    window.localStorage["token"] = "";
  }
}

decorate(Ydstore, {
  token: observable,
  userInfo: observable
});

export default createContext(new Ydstore());
