"use client";
import React from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Breadcrumb, Layout, Menu, Image } from "antd";
import PhotoWall from "./_components/PhotoWall";

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const Home: React.FC = () => {
  return (
    <Layout className="!min-h-screen">
      <Header style={{ display: "flex", alignItems: "center", backgroundColor: "white" }}>
        <Menu mode="horizontal" defaultSelectedKeys={["2"]} items={items1} style={{ flex: 1, minWidth: 0 }} />
        <Avatar className="size-10 !bg-blue-300" src="/image/Atom.png" />
      </Header>
      <Layout>
        <Layout className="p-4">
          <Content className="bg-white">
            <PhotoWall />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
