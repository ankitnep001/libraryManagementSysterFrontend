import axios from 'axios';
import { useEffect, useState } from 'react';

const ViewUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                const res = await axios.get(`http://localhost:8080/api/user/getById/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(res)
                setUser(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="p-8 bg-white shadow-md rounded-lg max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">User Information</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : user ? (
                <div className="text-black space-y-4">
                    <p><strong>First Name:</strong> {user.firstname}</p>
                    <p><strong>Last Name:</strong> {user.lastname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Status:</strong> {user.status}</p>
                    <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
            ) : (
                <p className="text-center text-gray-500">No user data available.</p>
            )}
        </div>
    );
};

export default ViewUser;
