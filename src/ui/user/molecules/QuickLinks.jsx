import { useState } from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../../../data/userMenuNavbar';

const QuickLinks = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleSubmenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    return (
        <ul className="space-y-2 text-sm">
            <h1 className='text-2xl'>Quick Links</h1>
            {menuItems.map((item, index) => (
                <li key={item.path}>
                    <div
                        className="font-medium cursor-pointer hover:text-gray-300 transition"
                        onClick={() => item.submenu && toggleSubmenu(index)}

                    >
                        <Link to={item.path} className="flex items-center w-full gap-1">
                            {item.title}
                            {item.submenu && (
                                <svg
                                    className={`w-4 h-4 ml-3 transition-transform ${openMenu === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </Link>
                    </div>

                    {/* Submenu (pushes content below) */}
                    {item.submenu && openMenu === index && (
                        <ul className="mt-2 ml-4 border-l border-gray-300 pl-2 space-y-1">
                            {item.submenu.map((subItem) => (
                                <li key={subItem.path}>
                                    <Link
                                        to={subItem.path}
                                        className="block px-2 py-1 text-white hover:bg-gray-100 rounded"
                                    >
                                        {subItem.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default QuickLinks;
