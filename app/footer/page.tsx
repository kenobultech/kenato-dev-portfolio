import React from 'react';

export default function Footer() {
  return (
    // FIX: Removed "fixed bottom-0 left-0" classes.
    // The footer is now a regular block element.
    <footer className="w-full p-4">
      {/* Inner container with styling matching the design */}
      <div className="max-w-7xl mx-auto px-6 py-4 rounded-2xl bg-[#202020] shadow-2xl shadow-black/50">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          
          {/* Logo */}
          <div className="text-3xl font-bold tracking-tight mb-2 sm:mb-0">
            <span className="text-blue-500">Ken</span>
            <span className="text-white">ato</span>
          </div>

          {/* Copyright and Developer Info */}
          <p className="text-md md:text-lg text-gray-400">
            &copy; {new Date().getFullYear()} Kenato. Developed by Kenneth Obul
          </p>
        </div>
      </div>
    </footer>
  );
}