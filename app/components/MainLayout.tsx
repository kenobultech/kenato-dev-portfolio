// app/components/MainLayout.js (Assuming this is the path)

"use client";
import Navbar from "../navbar/page";
import Footer from "../footer/page";
import ProfileCard from "../profilecard/page";
import Link from "next/link";
import { motion, TargetAndTransition } from "framer-motion";
import { Toaster } from 'react-hot-toast'; // 👈 IMPORT TOASTER

// --- Reusable Card Component (assuming it's in a shared location) ---
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: TargetAndTransition;
  transition?: Record<string, unknown>;
};

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  initial,
  animate,
  transition,
}) => (
  <motion.div
    initial={initial as TargetAndTransition}
    animate={animate as TargetAndTransition}
    transition={transition ?? { duration: 0.6 }}
    className={`bg-[#202020] rounded-3xl p-6 md:p-8 shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

const LetsTalkCard = () => (
  <Card
    initial={{ y: 80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    // 1. Change background and text color to match the dark theme
    className="bg-[ ] text-white text-center"
  >
    {/* Subtle dividers above the heading */}
    <div className="flex justify-center space-x-2 mb-8">
      <div className="w-12 h-0.5 bg-gray-600 rounded-full"></div>
      <div className="w-12 h-0.5 bg-gray-600 rounded-full"></div>
    </div>

    {/* 2. Update the main heading text */}
    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
      Collaborate, 👋
      <br /> create amazing things together!
    </h2>

    {/* 3. Update the paragraph text and constrain its width */}
    <p className="mb-10 text-lg text-gray-400 max-w-xl mx-auto">
      Ready to elevate 🚀 your brand? I specialize in creating stunning 🎨
      digital experiences that captivating and engage. Let&apos;s bring 🚀 your
      vision to life!
    </p>

    {/* 4. Update button styling for the gradient/shadow effect */}
    <Link href="/contact">
    <button
      className="py-3 px-10 rounded-xl bg-blue-600 hover:bg-white hover:text-black cursor-pointer text-lg text-white font-semibold 
                          
                         
                         transition-all 
                         shadow-xl shadow-blue-600/50

                         hover:shadow-white/50
                         "
    >
      Let&apos;s Talk With Us
    </button>
    </Link>
  </Card>
);

// MainLayout.js

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // 1. Toaster component should be at the root of the layout
    <div className="min-h-screen flex flex-col">
      <Toaster 
        position="top-right" // You can choose any position like "top-center"
        toastOptions={{
          style: {
            background: 'white', // white background for theme
            color: 'green',     // greentext
          },
          // Custom styling for success/error if desired
          success: {
            iconTheme: {
              primary: 'green', // Green checkmark
              secondary: 'white',
            },
          }
        }}
      /> 
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 flex-grow">
        {/* Left Column */}
        <div className="lg:sticky lg:top-28 h-fit">
          <ProfileCard />
        </div>

        {/* Right Column (This is where page-specific content will go) */}
        <div className="flex flex-col space-y-8">
          {children}
          <LetsTalkCard />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;