import * as React from 'react';
import { IConfig } from "@interface/IConfig";


export const config: IConfig = {
  title: "这是一个demo",
  column: [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    }
  ]
};
