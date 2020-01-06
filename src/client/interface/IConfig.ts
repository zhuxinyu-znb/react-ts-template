interface IColumns {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}

export interface IConfig {
  title?: string;
  column?: Array<IColumns>;
}
