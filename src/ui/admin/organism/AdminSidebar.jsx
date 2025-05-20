import {
    BookOpen,
    LayoutDashboard,
    ListOrdered,
    LogOut,
    Settings,
    Users
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Books", path: "/admin/books", icon: BookOpen },
    { name: "Borrowed Books", path: "/admin/borrowed-books", icon: ListOrdered },
    { name: "Settings", path: "", icon: Settings },
    { name: "Logout", icon: LogOut }
];

const AdminNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("role");

        navigate("/login");
    };

    return (
        <aside className="hidden md:flex flex-col w-64 bg-[#1f1f1f] text-white h-screen shadow-lg">
            <div className="px-6 py-5 text-xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex flex-col mt-6 px-4 gap-2">
                {/* eslint-disable-next-line no-unused-vars */}
                {navItems.map(({ name, path, icon: Icon }) => {
                    const isLogout = name === "Logout";

                    return isLogout ? (
                        <button
                            key={name}
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2 rounded text-sm font-medium text-gray-300 hover:bg-gray-700 transition"
                        >
                            <Icon size={18} />
                            {name}
                        </button>
                    ) : (
                        <Link
                            key={name}
                            to={path}
                            className={`flex items-center gap-3 px-4 py-2 rounded text-sm font-medium transition ${isActive(path)
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-700"
                                }`}
                        >
                            <Icon size={18} />
                            {name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminNavbar;
