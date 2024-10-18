"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Button from "antd/es/button";
import { redirect } from "next/navigation";
const queryClient = new QueryClient();
export default function CusQueryClientProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
