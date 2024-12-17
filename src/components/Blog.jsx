import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Beauty of Roses: Types and Care Tips",
      excerpt: "Discover the different types of roses and how to care for them to keep your garden vibrant.",
      image: "path_to_rose_image.jpg",
    },
    {
      id: 2,
      title: "Top 5 Flowers for Your Spring Garden",
      excerpt: "Enhance your garden with these beautiful and easy-to-grow spring flowers.",
      image: "path_to_spring_flowers_image.jpg",
    },
    {
      id: 3,
      title: "How to Arrange Flowers for a Stunning Bouquet",
      excerpt: "Learn the art of floral arrangement to create stunning bouquets for any occasion.",
      image: "path_to_bouquet_image.jpg",
    },
    {
      id: 4,
      title: "Caring for Indoor Plants: Tips from the Experts",
      excerpt: "Keep your indoor plants healthy and thriving with these expert tips.",
      image: "path_to_indoor_plants_image.jpg",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Flower Shop Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={post.image} alt={post.title} className="rounded-t-lg" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="card-actions justify-end">
                <Link to={`/blog/${post.id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
