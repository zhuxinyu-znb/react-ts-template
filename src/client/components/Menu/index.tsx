import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './menu.less';
import logo from '@assets/images/logo.png';

const { useState } = React;
const { Header, Sider, Content, Footer } = Layout;

const NavMenu: React.FC = function (props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
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
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
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


