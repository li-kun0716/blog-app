"use client";
import { Button, Form, Input } from "antd";
import React from "react";

export default function login() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form>
        <Form.Item label="Username" name="username">
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
