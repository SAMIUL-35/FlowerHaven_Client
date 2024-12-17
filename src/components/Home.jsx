import React, { useState, useEffect } from 'react';
import Flower from './Flower';
import Banner from './Banner';

const Home = () => {
    const [loadedFlowers, setLoadedFlowers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/category/')
            .then(res => res.json())
            .then(data => setCategories([{ id: '', name: 'All' }, ...data]))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    useEffect(() => {
        const fetchFlowers = async () => {
            const categoryFilter = selectedCategory ? `&category=${selectedCategory}` : '';
            const searchFilter = searchQuery ? `&search=${searchQuery}` : '';
            const response = await fetch(`http://127.0.0.1:8000/api/flower/?page=${currentPage}${categoryFilter}${searchFilter}`);
            const data = await response.json();
            setLoadedFlowers(data.results || []);
            setTotalPages(Math.ceil(data.count / 2));
        };

        fetchFlowers();
    }, [selectedCategory, currentPage, searchQuery]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
            <Banner />
            <div className="p-4 mt-5">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search flowers..."
                        className="w-full max-w-md p-2 border rounded"
                    />
                </div>
                <h2 className="text-center mb-4">Hot Flowers</h2>

                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 border rounded ${
                                selectedCategory === category.id ? 'bg-dark-500' : 'bg-dark'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {loadedFlowers.length === 0 ? (
                        <p className="col-span-full text-center">No flowers found. Please refine your search or select a category.</p>
                    ) : (
                        loadedFlowers.map(flower => (
                            <Flower key={flower.id} flower={flower} />
                        ))
                    )}
                </div>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPages}
                        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
