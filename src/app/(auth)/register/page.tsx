"use client";
import { Button, Form, Input } from "antd";
import React from "react";

export default function register() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form>
        <Form.Item label="Username">
          <Input />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" className="w-full">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
