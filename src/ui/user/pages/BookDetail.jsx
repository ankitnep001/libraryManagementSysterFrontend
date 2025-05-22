import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { image } from '../../../config/constant/image';

const BookDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const [categoryName, setCategoryName] = useState(location.state?.categoryName || '');
    const [book, setBook] = useState(null);
    const [bookImage, setBookImage] = useState(image.fallback);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/book/getBookById/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBook(res.data);

                // If categoryName wasn't passed via navigate state, fallback to book.category.categoryName
                if (!categoryName && res.data.category?.categoryName) {
                    setCategoryName(res.data.category.categoryName);
                }

                // Fetch image
                if (res.data.imageName) {
                    try {
                        const imgRes = await axios.get(`http://localhost:8080/api/book/image/${res.data.imageName}`, {
                            responseType: 'blob',
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        const imageUrl = URL.createObjectURL(imgRes.data);
                        setBookImage(imageUrl);
                    } catch (err) {
                        console.error('Image load failed:', err);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch book details:', error);
            }
        };

        fetchBookDetail();
    }, [id, token, categoryName]);

    if (!book) return <p className="text-center mt-10">Loading book details...</p>;

    return (
        <div className="p-6 md:p-10 bg-[#f9f9f9] min-h-screen">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                <img
                    src={bookImage}
                    alt={book.title}
                    className="w-60 h-80 object-cover rounded"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = image.fallback;
                    }}
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#222] mb-2">{book.title}</h1>
                        <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.authorName}</p>
                        <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {book.numberOfBooks}</p>
                        <p className="text-gray-700 mb-2"><strong>Category:</strong> {categoryName || 'Unknown'}</p>
                        <p className="text-gray-700 mb-4"><strong>Description:</strong> {book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
