import Logo from '../../common/molecules/Logo';
import QuickLinks from '../molecules/QuickLinks';

const Footer = () => {
    return (
        <footer className="bg-[#6941c5] text-white py-8 px-4">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo + Description */}
                <div>
                    <div className="mb-3">
                        <Logo className="h-40 w-auto" />
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
                        Discover your next great read. Browse, explore, and enjoy your favorite books — all at your fingertips.
                    </p>
                </div>

                {/* Quick Links with Nested Submenus */}
                <QuickLinks />

                {/* Copyright */}
                <div className="md:text-right text-sm text-gray-300 flex items-end justify-start md:justify-end">
                    <p>© {new Date().getFullYear()} Your Library. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
