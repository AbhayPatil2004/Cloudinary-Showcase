"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (

    <div className="drawer lg:drawer-open">

      <header className="w-full bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center sm:items-center justify-between py-4">

          {/* Logo */}
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <Link href="/" onClick={handleLogoClick}>
              <div className="text-2xl font-bold tracking-tight cursor-pointer text-white">
                Cloudinary Showcase
              </div>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={user.imageUrl}
                    alt={user.username || user.emailAddresses[0].emailAddress}
                  />
                </div>
                <span className="text-sm text-white truncate max-w-xs lg:max-w-md">
                  {user.username || user.emailAddresses[0].emailAddress}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-full hover:bg-gray-800 text-white"
                >
                  <LogOutIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>


      <div className="flex flex-col-reverse lg:flex-row-reverse w-full">

        {/* Page content */}
        <div className="drawer-content flex flex-col lg:flex-row flex-grow">
          <main className="flex-grow">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
              {children}
            </div>
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side flex flex-col w-full lg:w-64">
          <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
          <aside className="bg-base-200 w-full lg:w-64 h-full flex flex-col">
            <div className="flex items-center justify-center py-4">
              <ImageIcon className="w-10 h-10 text-primary" />
            </div>

            <ul className="p-4 w-full text-base-content flex-grow space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>


    </div>
  );
}




// {/* <div className="flex flex-row-reverse justify-end w-full" >

//         <div className="drawer-content flex flex-row">

//           {/* Page content */}
//           <main className="flex-grow">
//             <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
//               {children}
//             </div>
//           </main>

//         </div>

//         <div className="drawer-side flex flex-col w-fit">
//           <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
//           <aside className="bg-base-200 w-64 h-full flex flex-col">
//             <div className="flex items-center justify-center py-4">
//               <ImageIcon className="w-10 h-10 text-primary" />
//             </div>
//             <ul className="menu p-4 w-full text-base-content flex-grow">
//               {sidebarItems.map((item) => (
//                 <li key={item.href} className="mb-2">
//                   <Link
//                     href={item.href}
//                     className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${pathname === item.href
//                       ? "bg-primary text-white"
//                       : "hover:bg-base-300"
//                       }`}
//                     onClick={() => setSidebarOpen(false)}
//                   >
//                     <item.icon className="w-6 h-6" />
//                     <span>{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//             {/* {user && (
//               <div className="p-4">
//                 <button
//                   onClick={handleSignOut}
//                   className="btn btn-outline btn-error w-full"
//                 >
//                   <LogOutIcon className="mr-2 h-5 w-5" />
//                   Sign Out
//                 </button>
//               </div>
//             )} */}
//           </aside>
//         </div>

//       </div> */}