"use client";
import { useState } from "react";

// 服务器端渲染的页面
export default async function Page() {
  "use server";
  // 模拟获取数据（服务端获取）
  const users = [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
    { id: 3, name: "User Three" },
  ];

  // 返回服务器端渲染的页面并传递数据给客户端组件
  return (
    <div>
      <UserList users={users} />
    </div>
  );
}

function UserList({ users }) {
  "use client";
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleClick(user)}>{user.name}</button>
          </li>
        ))}
      </ul>

      {/* 显示选中的用户详情 */}
      {selectedUser && (
        <div>
          <h2>Selected User</h2>
          <p>ID: {selectedUser.id}</p>
          <p>Name: {selectedUser.name}</p>
        </div>
      )}
    </div>
  );
}
