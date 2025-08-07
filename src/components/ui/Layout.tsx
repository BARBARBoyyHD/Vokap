// components/layout/Layout.tsx
import React, { useState } from "react";
import Sidebar from "./sidebar";
import SidebarToggleButton from "./SidebarButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 relative min-h-screen bg-gray-100">
        <div className="p-4">
          <SidebarToggleButton onClick={() => setIsSidebarOpen(true)} />
        </div>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
