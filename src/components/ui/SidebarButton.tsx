// components/SidebarToggleButton.tsx
import React from "react";

interface SidebarToggleButtonProps {
  onClick: () => void;
}

export default function SidebarToggleButton({
  onClick,
}: SidebarToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold text-blue-600 hover:text-blue-700 transform transition-transform duration-300 hover:rotate-90"
    >
      ☰
    </button>
  );
}
