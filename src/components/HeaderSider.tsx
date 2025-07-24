import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth.slice";

const { Header, Sider, Content } = Layout;

const HeaderSider: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "/users") navigate("/users");
    if (key === "/products") navigate("/products");
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 100,
        }}
      >
        <div>
          <div
            onClick={() => navigate("/")}
            className="text-3xl font-bold flex justify-center items-center p-3 text-white cursor-pointer select-none"
          >
            APP
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultSelectedKeys={["0"]}
            onClick={handleMenuClick}
            items={[
              {
                key: "/users",
                icon: <UserOutlined />,
                label: "Users",
              },
              {
                key: "/products",
                icon: <ProductOutlined />,
                label: "Products",
              },
            ]}
          />
        </div>
        <div className="px-1 py-4">
          <Button
            type="primary"
            danger
            block
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            {collapsed ? <LogoutOutlined /> : "Sign Out"}
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 101,
            padding: 0,
            background: "#001529",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              color: "white",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 680,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HeaderSider;
