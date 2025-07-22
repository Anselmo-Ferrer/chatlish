import SideBar from "@/components/SideBar";
import React from "react";

export default function Layout( { children }: Readonly<{children: React.ReactNode}> ) {
  return (
    <div className="w-full h-screen bg-[#121212] flex">
      <SideBar />
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}