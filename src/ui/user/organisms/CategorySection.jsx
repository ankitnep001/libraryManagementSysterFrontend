import axios from 'axios';
import { useEffect, useState } from 'react';

const INITIAL_VISIBLE_COUNT = 6;

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.get("http://localhost:8080/api/category/getAllCategory", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(res)
                setCategories(res.data || []);
            } catch (err) {
                setError('Failed to load categories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleToggleView = () => {
        setVisibleCount(prev => (prev === INITIAL_VISIBLE_COUNT ? categories.length : INITIAL_VISIBLE_COUNT));
    };

    const visibleCategories = categories.slice(0, visibleCount);

    return (
        <section className="py-12 px-4 md:px-10 bg-[#f9f9f9]">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#222]">Explore Categories</h2>
            <p>All </p>

            {loading ? (
                <p className="text-center text-[#555]">Loading categories...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {visibleCategories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-[#ffffff] shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-2 text-[#333]">
                                    {category.categoryName?.trim()}
                                </h3>
                                <p className="text-sm text-[#555]">
                                    {category.categoryDescription}
                                </p>
                            </div>
                        ))}
                    </div>

                    {categories.length > INITIAL_VISIBLE_COUNT && (
                        <div className="text-center mt-8">
                            <button
                                onClick={handleToggleView}
                                className="px-6 py-2 bg-[#222] text-white rounded-full hover:bg-[#333] transition"
                            >
                                {visibleCount === INITIAL_VISIBLE_COUNT ? 'Load More' : 'Show Less'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default CategorySection;
