import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './menu.less';
import {Link} from 'react-router-dom';
import logo from '@assets/images/logo.png';
import { Axios } from '@utils/tool';

const { useState, useEffect } = React;
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface IMenu {
  title: string;
  id: string;
  path?:'';
  children?: IMenu[]
}

const NavMenu: React.FC = function (props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [menuData, setMenuData] = useState([]);

  // 创建导航选项
  const createMenu = (arr: IMenu[]): React.FC[] => {
    let list = [];
    arr && arr.forEach((d, i) => {
      if (d.children !== undefined) {
        list.push(
          <SubMenu
            key={d.id}
            title={d.title}
          >
            {createMenu(d.children)}
          </SubMenu>)
      } else {
        list.push(
          <Menu.Item key={d.id}>
            <Icon type="user" />
            <span><Link to={d.path}>{d.title}123</Link></span>
          </Menu.Item>
        )
      }
    });
    return list;
  };

  // 获取导航数据
  const getDate = async (): Promise<any> => {
    const data = await Axios.post('/getMenu');
    setMenuData(data);
  }

  useEffect(() => {
    getDate();
  }, [])

  const toggle = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="menu_logo">
          <img src={logo} alt="JYD" />
          <span>jyd</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {createMenu(menuData)}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          &copy;竞业达数码科技股份有限公司
        </Footer>
      </Layout>
    </Layout>
  )
}

export default NavMenu;