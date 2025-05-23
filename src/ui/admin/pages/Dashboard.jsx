import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [bookStats, setBookStats] = useState({});
    const [borrowStats, setBorrowStats] = useState({});
    const [userStats, setUserStats] = useState({});
    const token = localStorage.getItem('token');

    const fetchStats = async () => {
        try {
            const [bookRes, borrowRes, userRes] = await Promise.all([
                axios.get('http://localhost:8080/api/book/statistic', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get('http://localhost:8080/api/borrow/admin/statistic', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get('http://localhost:8080/api/user/admin/user_statics', {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            setBookStats(bookRes.data);
            setBorrowStats(borrowRes.data);
            setUserStats(userRes.data);
        } catch (error) {
            console.error('Error fetching dashboard statistics:', error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const renderStatCard = (title, stats, color = 'blue') => (
        <div className={`border-l-4 border-${color}-500 bg-white shadow p-5 rounded-lg`}>
            <h2 className="text-xl font-bold mb-3 text-gray-700">{title}</h2>
            <ul className="space-y-1">
                {Object.entries(stats).map(([key, value]) => (
                    <li key={key} className="text-gray-600 capitalize flex justify-between">
                        <span>{key.toLowerCase()}</span>
                        <span className="font-semibold">{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="p-6 md:p-10 bg-[#f9f9f9] min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-10 text-[#222]">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderStatCard('Books', bookStats, 'blue')}
                {renderStatCard('Borrows', borrowStats, 'green')}
                {renderStatCard('Users', userStats, 'purple')}
            </div>
        </div>
    );
};

export default Dashboard;
