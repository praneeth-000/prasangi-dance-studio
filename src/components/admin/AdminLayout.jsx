import { Outlet, Navigate, NavLink, useLocation } from "react-router-dom";
import { Users, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../PageTransition";

function AdminLayout() {
  const isAuthenticated = localStorage.getItem("adminAuth");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">

        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Prasangi Studio</h2>
          <p className="text-xs text-gray-500">Admin Workspace</p>
        </div>

        <nav className="flex flex-col gap-2 p-4">

          <NavLink
            to="/admin"
            end
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/students"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <Users size={18} />
            Students
          </NavLink>

          <NavLink
            to="/admin/students/add"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
          >
            <UserPlus size={18} />
            Add Student
            
          </NavLink>
          <NavLink
              to="/admin/revenue"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
            >
              💰 Revenue
            </NavLink>

        </nav>
        <a
          href="/"
          className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-3 py-2 rounded w-full mb-3 hover:bg-gray-300"
        >
          ← Go to Website
        </a>

        <div className="mt-auto p-4 border-t">

          <button
            onClick={() => {
              localStorage.removeItem("adminAuth");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded w-full justify-center hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

    </div>
  );
}

export default AdminLayout;