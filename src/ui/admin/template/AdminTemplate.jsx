import { Outlet } from "react-router-dom";
import { useRequireAuth } from "../../../hooks/useRequireAuth";
import AdminSidebar from "../organism/AdminSidebar";

const AdminTemplate = () => {
    useRequireAuth(["ADMIN"]);

    return (
        <div className=" flex h-screen ">
            {/* Fixed Sidebar */}
            <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-50">
                <AdminSidebar />
            </div>

            {/* Main content area */}
            <div className="flex-1 md:pl-64">
                {/* Small screen message */}
                <div className="md:hidden h-full flex items-center justify-center bg-[#ffeedc] text-[#5b3423] px-4 text-center">
                    <p className="text-lg font-semibold">
                        Please open this page on a PC or laptop for the best experience.
                    </p>
                </div>

                {/* Scrollable content for medium and above */}
                <div className="hidden md:block h-screen overflow-y-auto p-4 ]">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminTemplate;
