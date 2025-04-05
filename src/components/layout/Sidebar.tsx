
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Projects", icon: Briefcase, path: "/projects" },
    { name: "Finance", icon: DollarSign, path: "/finance" },
    { name: "Employees", icon: Users, path: "/employees" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-sidebar text-white"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Desktop and Mobile */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "fixed md:relative h-full z-40"
        )}
      >
        {/* Logo and Toggle Section */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <span className="text-xl font-bold text-white">Nexus</span>
            )}
            {collapsed && <span className="text-xl font-bold text-white">N</span>}
          </div>
          
          {/* Desktop Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden md:flex p-1 hover:bg-sidebar-accent rounded"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      "hover:bg-sidebar-accent",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground"
                    )
                  }
                >
                  <item.icon size={20} />
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-nexus-teal-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-300 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
