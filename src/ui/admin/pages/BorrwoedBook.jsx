import axios from 'axios';
import { useEffect, useState } from 'react';

const BorrowedBook = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const fetchBorrowedBooks = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/borrow/getAll', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log
            setBorrowedBooks(res.data);
        } catch (err) {
            console.error('Error fetching borrowed books:', err);
            setError('Failed to load borrowed books.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-white">Loading borrowed books...</p>;
    }
    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="bg-[#262626] text-white p-4 rounded-xl mx-4 md:mx-10 overflow-x-auto ">
            <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>

            <table className="min-w-[900px] w-full text-left border-separate border-spacing-y-2">
                <thead className="text-gray-400 text-sm">
                    <tr>
                        <th className="px-4 py-2">S.N.</th>
                        <th className="py-2 px-4">Book Title</th>
                        <th className="py-2 px-4">Borrowed By</th>
                        <th className="py-2 px-4">Borrow Date</th>
                        <th className="py-2 px-4">Return Date</th>
                        {/* Add more columns if needed */}
                    </tr>
                </thead>
                <tbody>
                    {borrowedBooks.length > 0 ? (
                        borrowedBooks.map((borrow, index) => (
                            <tr key={borrow.id || index} className="bg-[#1e1e1e] rounded-lg">
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{index + 1}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{borrow.book?.id || 'N/A'}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{borrow.user?.id || 'N/A'}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border-t border-[#ffffff8a]">
                                    {borrow.returnDate
                                        ? new Date(borrow.returnDate).toLocaleDateString()
                                        : 'Not returned'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                No borrowed books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BorrowedBook;
