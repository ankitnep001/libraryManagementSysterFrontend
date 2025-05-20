import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

const AdminTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:9090/api/user/admin/getAll', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleView = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:9090/api/user/getById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedUser(res.data);
            setShowModal(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.get(`http://localhost:9090/api/user/admin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers((prev) =>
                prev.map((user) =>
                    user.id === id ? { ...user, status: 'DELETE' } : user
                )
            );
        } catch (err) {
            console.error('Delete Error:', err);
            alert(err?.response?.data?.message || 'Something went wrong while deleting the user.');
        }
    };

    return (
        <div className="bg-[#262626] text-white p-4 rounded-xl mx-4 md:mx-10 overflow-x-auto">
            <h2 className="flex justify-center text-2xl font-semibold mb-4 text-center md:text-left">
                Admin Table
            </h2>

            <div className="overflow-x-auto w-full">
                <table className="min-w-[800px] w-full text-center border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-400 text-sm">
                            <th className="px-4 py-2">S.N.</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Contact</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">View</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} className="hover:bg-[#333] transition duration-200 rounded-lg">
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{index + 1}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.firstname}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.lastname}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.email}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.contactNumber}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.address}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{user.role}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'ACTIVE'
                                            ? 'bg-green-600 text-white'
                                            : user.status === 'DELETE'
                                                ? 'bg-red-600 text-white'
                                                : 'bg-gray-500 text-white'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td
                                    className="px-4 py-2 border-t border-[#ffffff8a] cursor-pointer text-blue-400 hover:underline"
                                    onClick={() => handleView(user.id)}
                                >
                                    View
                                </td>
                                <td className="flex justify-center items-center px-4 py-2 border-t border-[#ffffff8a] cursor-pointer text-red-400 hover:underline">
                                    <MdDeleteForever size={24} onClick={() => handleDelete(user.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-[#1e1e1e] py-6 px-10 rounded-xl w-[90%] max-w-md text-white relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-red-700"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold mb-6 text-center border-b border-gray-700 pb-2">
                            User Details
                        </h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
                            <p className="text-gray-400">First Name:</p>
                            <p>{selectedUser.firstname}</p>
                            <p className="text-gray-400">Last Name:</p>
                            <p>{selectedUser.lastname}</p>
                            <p className="text-gray-400">Email:</p>
                            <p>{selectedUser.email}</p>
                            <p className="text-gray-400">Role:</p>
                            <p>
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                                    {selectedUser.role}
                                </span>
                            </p>
                            <p className="text-gray-400">Status:</p>
                            <p>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedUser.status === 'ACTIVE'
                                        ? 'bg-green-600 text-white'
                                        : selectedUser.status === 'DELETE'
                                            ? 'bg-red-600 text-white'
                                            : 'bg-gray-600 text-white'
                                        }`}
                                >
                                    {selectedUser.status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTable;
