import * as React from "react";
import { decorate, observable } from "mobx";

const { createContext } = React;

export class ReportStore {
    public num = 0;
    public name: string
    public add(name: string): void {
      this.num += 1;
      this.name = name;
    }
}

decorate(ReportStore, {
  num: observable,
  name: observable
})

export default createContext(new ReportStore());