import React from 'react';
import { Link } from 'react-router-dom';

// Import images
import blog1 from '/assets/blog1.jpg';
import blog2 from '/assets/blog2.jpg';
import blog3 from '/assets/blog3.jpg';
import blog4 from '/assets/blog4.jpg';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Beauty of Roses: Types and Care Tips",
      excerpt: "Discover the different types of roses and how to care for them to keep your garden vibrant.",
      image: blog1,
    },
    {
      id: 2,
      title: "Top 5 Flowers for Your Spring Garden",
      excerpt: "Enhance your garden with these beautiful and easy-to-grow spring flowers.",
      image: blog2,
    },
    {
      id: 3,
      title: "How to Arrange Flowers for a Stunning Bouquet",
      excerpt: "Learn the art of floral arrangement to create stunning bouquets for any occasion.",
      image: blog3,
    },
    {
      id: 4,
      title: "Caring for Indoor Plants: Tips from the Experts",
      excerpt: "Keep your indoor plants healthy and thriving with these expert tips.",
      image: blog4,
    },
  ];

  return (
    <div className="bg-gray-300 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Flower Heaven Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <figure>
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              </figure>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  
                  className="btn btn-primary w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
