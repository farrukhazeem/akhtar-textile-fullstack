"use client";

import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  ReadOutlined,
  SettingOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  FileOutlined,
  BulbOutlined,
  UserOutlined, 
  UploadOutlined
} from "@ant-design/icons";

export default function AppSideMenu() {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState([""]);

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setSelectedKey(["2"]);
    } else if (pathname.startsWith("/recipe")) {
      setSelectedKey(["3"]);
    } else if (pathname.startsWith("/upload-recipe")) {
      setSelectedKey(["4"]);
    } 
    else if (pathname.startsWith("/setup")) {
      setSelectedKey(["5"]);
    }
      else if (pathname.startsWith("/p-l")) {
      setSelectedKey(["6"]);
    } else if (pathname.startsWith("/damco-data")) {
      setSelectedKey(["7"]);
    } else if (pathname.startsWith("/nexus-data")) {
      setSelectedKey(["8"]);
    } else if (pathname.startsWith("/privileges")) {
      setSelectedKey(["9"]);
    } else if (pathname.startsWith("/logout")) {
      setSelectedKey(["10"]);
    } else if (pathname === "/") {
      setSelectedKey(["1"]);
    }
  }, [pathname]);

  const menuItems = [
    { label: <Link href="/dashboard">Dashboard</Link>, key: "2", icon: <HomeOutlined /> },
    { label: <Link href="/recipe">Recipes</Link>, key: "3", icon: <ReadOutlined /> },
    { label: <Link href="/upload-recipe">Upload Recipe</Link>, key: "4", icon: <UploadOutlined /> },
    { label: <Link href="/setup">Setup</Link>, key: "5", icon: <UserOutlined /> },
    { label: <Link href="/p-l">P&L</Link>, key: "6", icon: <BarChartOutlined /> },
    { label: <Link href="/damco-data">Damco Data</Link>, key: "7", icon: <DatabaseOutlined /> },
    { label: <Link href="/nexus-data">Nexus Data</Link>, key: "8", icon: <FileOutlined /> },
    { label: <Link href="/privileges">Privileges</Link>, key: "9", icon: <BulbOutlined /> },
    { label: <Link href="/logout">Setting</Link>, key: "10", icon: <SettingOutlined /> },
  ];

  return (
    <Menu mode="inline" items={menuItems} selectedKeys={selectedKey} />
  );
}
