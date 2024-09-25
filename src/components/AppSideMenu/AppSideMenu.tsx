// "use client";

// import { Menu } from "antd";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import {
//   HomeOutlined,
//   ReadOutlined,
//   SettingOutlined,
//   BarChartOutlined,
//   DatabaseOutlined,
//   FileOutlined,
//   BulbOutlined,
//   UserOutlined, 
//   UploadOutlined,
// } from "@ant-design/icons";
// import { useRouter } from 'next/navigation'; 
// import { notification } from 'antd';

// export default function AppSideMenu() {
//   const pathname = usePathname();
//   const [selectedKey, setSelectedKey] = useState(["3"]);
//   const router = useRouter(); 

//   useEffect(() => {
//     if (pathname.startsWith("/dashboard")) {
//       setSelectedKey(["2"]);
//     } else if (pathname.startsWith("/recipe")) {
//       setSelectedKey(["3"]);
//     } else if (pathname.startsWith("/upload-recipe")) {
//       setSelectedKey(["4"]);
//     } 
//     else if (pathname.startsWith("/setup")) {
//       setSelectedKey(["5"]);
//     }
//       else if (pathname.startsWith("/p-l")) {
//       setSelectedKey(["6"]);
//     } else if (pathname.startsWith("/damco-data")) {
//       setSelectedKey(["7"]);
//     } else if (pathname.startsWith("/nexus-data")) {
//       setSelectedKey(["8"]);
//     } else if (pathname.startsWith("/privileges")) {
//       setSelectedKey(["9"]);
//     } else if (pathname.startsWith("/employees")) {
//       setSelectedKey(["10"]);
//     }
//     else if (pathname.startsWith("/logout")) {
//       setSelectedKey(["11"]);
//     } else if (pathname === "/") {
//       setSelectedKey(["1"]);
//     }
//   }, [pathname]);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('/api/logout', { method: 'POST' });
  
//       if (response.ok) {
//         notification.success({
//           message: 'Logged Out',
//           description: 'You have successfully logged out.',
//           placement: 'topRight', 
//         });
  
//         router.push('/'); 
//       } else {
//         console.error('Logout failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Logout request failed', error);
//       notification.error({
//         message: 'Logout Failed',
//         description: 'There was a problem logging you out. Please try again.',
//         placement: 'topRight',
//       });
//       // Handle network errors or other issues
//     }
//   };

//   const menuItems = [
//     { label: <Link href="/dashboard">Dashboard</Link>,
//        key: "2", icon: <HomeOutlined /> },
//     { label: <Link href="/recipe">Recipes</Link>, 
//       children: [
   
//         { label: <Link href="/upload-recipe">Upload Recipe</Link>, key: "4", 
//           icon: <UploadOutlined /> }],
      
//       key: "3", icon: <ReadOutlined /> },
   
//     { label: <Link href="/setup">Setup</Link>, 
//       children: [
   
//         { label: <Link href="/employees">Employees</Link>, key: "10", icon: <UserOutlined /> }],
      
//       key: "5", icon: <BulbOutlined /> },
//     { label: <Link href="/p-l">P&L</Link>, key: "6", icon: <BarChartOutlined /> },
//     { label: <Link href="/damco-data">Damco Data</Link>, key: "7", icon: <DatabaseOutlined /> },
//     { label: <Link href="/nexus-data">Nexus Data</Link>, key: "8", icon: <FileOutlined /> },
//     { label: <Link href="/privileges">Privileges</Link>, key: "9", icon: <SettingOutlined /> },
//     { label: <a onClick={handleLogout}>Logout</a>,  key: "11", icon: <SettingOutlined /> },
//   ];

//   return (
//     <Menu mode="inline" items={menuItems} selectedKeys={selectedKey} />
//   );
// }


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
  UploadOutlined,
  ExperimentOutlined 
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { notification } from "antd";

export default function AppSideMenu() {
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState("1");
  const [openKeys, setOpenKeys] = useState<string[]>([]); 
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/dashboard")) {
      setSelectedKey("2");
    } else if (pathname.startsWith("/recipe")) {
      setSelectedKey("12");
      setOpenKeys(["3"]);  
    } else if (pathname.startsWith("/recipe")) {
      setSelectedKey("3");
      setOpenKeys(["3"]);  
    } else if (pathname.startsWith("/upload-recipe")) {
      setSelectedKey("4");
      setOpenKeys(["3"]);  
    } else if (pathname.startsWith("/setup")) {
      setSelectedKey("5");
      setOpenKeys(["5"]);  
    } else if (pathname.startsWith("/employees")) {
      setSelectedKey("10");
      setOpenKeys(["5"]);  
    } else if (pathname.startsWith("/chemicals")) {
      setSelectedKey("15");
      setOpenKeys(["5"]); 
    }     
    else if (pathname.startsWith("/p-l")) {
      setSelectedKey("6");
    } else if (pathname.startsWith("/damco-data")) {
      setSelectedKey("7");
    } else if (pathname.startsWith("/nexus-data")) {
      setSelectedKey("8");
    } else if (pathname.startsWith("/privileges")) {
      setSelectedKey("9");
    } else if (pathname.startsWith("/logout")) {
      setSelectedKey("11");
    } else if (pathname === "/") {
      setSelectedKey("1");
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        notification.success({
          message: "Logged Out",
          description: "You have successfully logged out.",
          placement: "topRight",
        });

        router.push("/");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout request failed", error);
      notification.error({
        message: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
        placement: "topRight",
      });
    }
  };

  const menuItems = [
    {
      label: <Link href="/dashboard" className="text-black">Dashboard</Link>,
      key: "2",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <span className="text-black">Reciepe</span>
      ),
      children: [
        {
          label: (
            <Link href="/recipe" className="text-black">Reciepe List</Link>
          ),
          key: "12",  // New key for Reciepe List
          icon: <ReadOutlined />,
        },
        {
          label: (
            <Link href="/upload-recipe" className="text-black">Upload Recipe</Link>
          ),
          key: "4",
          icon: <UploadOutlined />,
        },
      ],
      key: "3",
      icon: <ReadOutlined />,
    },
    {
      label: (
        <Link href="/setup" className="text-black">Setup</Link>
      ),
      children: [
        {
          label: (
            <Link href="/employees" className="text-black">Employees</Link>
          ),
          key: "10",
          icon: <UserOutlined />,
        },
        {
          label: (
            <Link href="/chemicals" className="text-black">Chemicals</Link>
          ),
          key: "15",
          icon: <ExperimentOutlined  />,
        },
      ],
      key: "5",
      icon: <BulbOutlined />,
    },
    {
      label: <Link href="/p-l">P&L</Link>,
      key: "6",
      icon: <BarChartOutlined />,
    },
    {
      label: <Link href="/damco-data">Damco Data</Link>,
      key: "7",
      icon: <DatabaseOutlined />,
    },
    {
      label: <Link href="/nexus-data">Nexus Data</Link>,
      key: "8",
      icon: <FileOutlined />,
    },
    {
      label: <Link href="/privileges">Privileges</Link>,
      key: "9",
      icon: <SettingOutlined />,
    },
    {
      label: <a onClick={handleLogout}>Logout</a>,
      key: "11",
      icon: <SettingOutlined />,
    },
  ];

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys); // Manage which submenu is open
  };

  return (
    <Menu
      mode="inline"
      items={menuItems.map(item => ({
        ...item,
        style: item.key === selectedKey[0] ? {color: "#797FE7" } : {}
      }))}
      selectedKeys={[selectedKey]}
      openKeys={openKeys} // Handle open keys for submenus
      onOpenChange={onOpenChange} // Handle opening/closing of submenus
    />
  );
}
