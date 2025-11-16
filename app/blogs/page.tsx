// app/blogs/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';
import { motion } from 'framer-motion';

// --- Data Structure for Blog Posts ---
interface BlogPost {
  title: string;
  author: string;
  slug: string; // Used for the unique URL path
  imagePath: string; // Placeholder image path
  delay: number; // for staggering animation
}

// --- Placeholder Blog Data (4 Posts) ---
const blogPosts: BlogPost[] = [
  {
    title: "How Clarity of Mind Transformed My UI & Development Journey",
    author: "Kenneth Obul",
    slug: "clarity-of-mind-in-ui-development",
    imagePath: "/images/blog_1.jpeg",
    delay: 0.1,
  },
  {
    title: "How Coding Gave Me Purpose During Difficult Moments of My Life",
    author: "Kenneth Obul",
    slug: "coding-gave-me-purpose",
    imagePath: "/images/blog_2.jpeg",
    delay: 0.2,
  },
  
  {
    title: "Why Becoming a Developer Became the Turning Point of My Entire Future",
    author: "Kenneth Obul",
    slug: "developer-turned-my-future",
    imagePath: "/images/blog_3.jpeg",
    delay: 0.3,
  },
  
  {
    title: "How I Turned Fear, Doubt, and Failure Into Motivation to Grow in Tech",
    author: "Kenneth Obul",
    slug: "turning-fear-into-growth",
    imagePath: "/images/blog_4.jpeg",
    delay: 0.4,
  },
  
];

// --- Blog Card Component ---
const BlogCard: React.FC<BlogPost> = ({ title, author, slug, imagePath, delay }) => {
  const postUrl = `/blogs/${slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120 }}
      viewport={{ once: true }}
    >
      <Link href={postUrl} passHref>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-[#2B2B2B] rounded-3xl p-4 flex flex-col cursor-pointer h-full
                     hover:bg-[#353535] duration-300 shadow-xl"
        >
          {/* Blog Image */}
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4">
            <Image
              src={imagePath}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover rounded-2xl transition duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col flex-grow">
            <p className="text-sm text-gray-500 mb-2">By {author}</p>
            <h3 className="font-bold text-lg text-white mb-4 flex-grow">{title}</h3>
            
            {/* Read More Link */}
            <span className="text-blue-500 font-semibold hover:text-blue-400 transition duration-150 mt-auto">
              Read More
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

// --- Works Page Component ---
const BlogsPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        
        {/* Header - "Latest Blogs" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-5"
        >
          <h2 className="text-xl md:text-3xl font-bold text-white">Latest Blogs</h2>
        </motion.div>

        {/* Blogs Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } }
          }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {blogPosts.map((post, index) => (
            <BlogCard 
              key={index} 
              {...post} 
            />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default BlogsPage;
