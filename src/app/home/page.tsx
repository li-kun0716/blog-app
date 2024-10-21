"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu } from "antd";
import PhotoWall from "./_components/PhotoWall";

const { Header, Content } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

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
