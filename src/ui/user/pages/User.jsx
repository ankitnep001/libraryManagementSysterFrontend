import { useState } from 'react';
import BorrowedDetails from '../organisms/BorrowedDetail';
import ViewUser from '../organisms/ViewUser';

const User = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="p-4  text-white min-h-screen">
            <nav className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    Profile
                </button>
                <button
                    onClick={() => setActiveTab('borrowedBooks')}
                    className={`px-4 py-2 rounded ${activeTab === 'borrowedBooks' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    Borrowed Books
                </button>
            </nav>

            <div className='text-black'>
                {activeTab === 'profile' && (
                    <ViewUser />
                )}

                {activeTab === 'borrowedBooks' && (
                    <BorrowedDetails />
                )}
            </div>
        </div>
    );
};

export default User;
