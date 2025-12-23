import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/projects", label: "Projects", icon: FolderKanban },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-gradient-to-b from-blue-50 to-emerald-50 border-r border-blue-200/30 transition-all duration-300
      ${isExpanded ? "w-64" : "w-20"}`}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-blue-200/30 bg-gradient-to-r from-blue-100/30 to-emerald-100/30">
        {isExpanded ? (
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            Zyro
          </h1>
        ) : (
          <span className="text-xl font-bold text-blue-500">Z</span>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-blue-200 text-blue-600"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex-1 mt-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                ${isActive
                  ? "bg-emerald-500/20 text-emerald-700 font-medium border-l-2 border-emerald-500"
                  : "text-blue-600/80 hover:bg-blue-100 hover:text-blue-700"
                }`}
            >
              <Icon size={20} />
              {isExpanded && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
