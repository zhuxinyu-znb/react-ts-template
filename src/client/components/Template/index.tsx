import * as React from 'react';
import { Table, Divider, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';

import { IConfig } from '@interface/IConfig';
import {pageReducer} from '@models/demoReducer';

import './template.less';

const { useEffect, useReducer, useState } = React;

interface ITable {
  key: string;
  name: string;
  age: string;
  address: string;
  tags: string[];
}

// 分页样式配置
const paginationConfig = {
  showTotal: total => `共 ${total} 条`, 
  showQuickJumper: true,
}

export const PageContext = React.createContext(null);

const Template = function () {
  const [pageState, pageDispatch] = useReducer(pageReducer, {stagecode: 0});

  const columns: ColumnProps<ITable>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const data: ITable[] = [
    {
      key: '1',
      name: 'John Brown',
      age: '32',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: '42',
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: '42',
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <PageContext.Provider value={{ pageState, dispatch: pageDispatch }}>
      <div className="jyd-title-container">
        <h2>人员</h2>
      </div>
      <div className="jyd-filter-container">
        全部
      </div>
      <Table columns={columns} dataSource={data} pagination={paginationConfig}/>
    </PageContext.Provider>
  )
}

export default Template;
