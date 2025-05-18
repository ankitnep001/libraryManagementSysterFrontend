import { Outlet } from 'react-router-dom';
import Footer from '../organisms/Footer';
import Navbar from '../organisms/Navbar';

const UserTemplate = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Make content take all remaining space */}
            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default UserTemplate;
