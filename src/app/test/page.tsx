import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Test",
  description: "Test page",
  keywords: "test, page",
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="container">
      <h1>
        <code lang="js"></code>
      </h1>
    </div>
  );
}
