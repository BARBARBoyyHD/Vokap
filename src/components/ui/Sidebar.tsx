import{ useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  path: string;
}

interface UserInfo {
  username: string | null;
  role: string | null;
}

const sidebarMenu: MenuItem[] = [
  { name: "Asset", path: "/asset" },
  { name: "Level", path: "/level" },
  { name: "Question", path: "/question" },
  { name: "Word Shuffle", path: "/wordshuffle" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: null,
    role: null,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    setUserInfo({
      username: storedUsername ? JSON.parse(storedUsername) : null,
      role: storedRole ? JSON.parse(storedRole) : null,
    });
  }, []);

  // Role-based filtering
  const getVisibleMenu = () => {
    if (userInfo.role === "Admin") {
      return sidebarMenu.filter((item) => item.name === "Asset");
    } else if (userInfo.role === "Teacher") {
      return sidebarMenu.filter((item) => item.name !== "Asset");
    }
    return sidebarMenu;
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-blue-600 shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white">
        <h2 className="text-xl font-bold text-white">Vokaplay</h2>
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="text-white text-xl hover:text-gray-200 transition-transform transform hover:rotate-90"
        >
          ✕
        </button>
      </div>

      {/* Menu + Footer */}
      <div className="flex flex-col justify-between h-full">
        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {getVisibleMenu().map((item) => {
            const isDisabled =
              userInfo.role === "teacher" && item.name === "Asset";
            return (
              <div key={item.name}>
                {isDisabled ? (
                  <div className="block px-3 py-2 rounded-md text-sm font-semibold text-white opacity-50 cursor-not-allowed bg-blue-500">
                    {item.name}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-sm font-semibold transition ${
                        isActive
                          ? "bg-white text-blue-700"
                          : "text-white hover:bg-blue-500 hover:text-white"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer with user info and logout */}
        <div className="p-4 mb-[80px] border-t border-white flex items-center justify-between">
          <div className="text-white text-sm max-w-[130px]">
            <p className="truncate font-medium">
              {userInfo.username ?? "Guest"}
            </p>
            <p className="truncate text-xs text-gray-200">
              {userInfo.role ?? "No Role"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded hover:bg-blue-500 transition"
            title="Logout"
          >
            <MdOutlineLogout className="text-white text-xl" />
          </button>
        </div>
      </div>
    </aside>
  );
}
