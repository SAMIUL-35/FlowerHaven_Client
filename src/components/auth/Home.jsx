import React, { useState, useEffect } from 'react';
import Flower from '../client/Flower';
import Banner from '../extra/Banner';
import FlowerSlider from '../extra/FloerSlider';
import StatsSection from '../extra/StateSection';
import Newsletter from '../extra/NewsLetter';

const Home = () => {
    const [loadedFlowers, setLoadedFlowers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch categories
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/category/')
            .then(res => res.json())
            .then(data => setCategories([{ id: '', name: 'All' }, ...data]))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    // Fetch flowers based on category, search query, and pagination
    useEffect(() => {
        const fetchFlowers = async () => {
            const categoryFilter = selectedCategory ? `&category=${selectedCategory}` : '';
            const searchFilter = searchQuery ? `&search=${searchQuery}` : '';
            const response = await fetch(`http://127.0.0.1:8000/api/flower/?page=${currentPage}${categoryFilter}${searchFilter}`);
            const data = await response.json();
            setLoadedFlowers(data.results || []);
            setTotalPages(Math.ceil(data.count / 12));
        };

        fetchFlowers();
    }, [selectedCategory, currentPage, searchQuery]);

    // Handle category filter change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };

    // Handle page navigation
    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        } else if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return (
        <>
        <FlowerSlider />
            <Banner />
            <div className="p-8 mt-6 max-w-screen-xl mx-auto">
                {/* Search Bar */}
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search flowers..."
                        className="w-full max-w-md p-3 text-gray-600 bg-white border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Title and Description */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4 tracking-wide">
                        Hot Flowers
                    </h2>
                    <p className="text-lg md:text-xl font-medium text-gray-700 leading-relaxed max-w-3xl mx-auto">
                        Discover the best flowers in your area. Filter by category and search for specific flowers.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-6 mb-8">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
                                selectedCategory === category.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Flower List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loadedFlowers.length === 0 ? (
                        <p className="col-span-full text-center text-xl text-gray-900">No flowers found. Please refine your search or select a category.</p>
                    ) : (
                        loadedFlowers.map(flower => (
                            <div key={flower.id} className="flex justify-center items-center">
                                <Flower key={flower.id} categories={categories} flower={flower} style={{ maxWidth: '90%' }} />
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange('prev')}
                        disabled={currentPage === 1}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-600 transition-all duration-300"
                    >
                        Previous
                    </button>
                    <span className="text-gray-900 text-xl">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange('next')}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md disabled:opacity-50 hover:bg-blue-600 transition-all duration-300"
                    >
                        Next
                    </button>
                </div>
            </div>
            <StatsSection/>
            <Newsletter/>
        </>
    );
};

export default Home;
