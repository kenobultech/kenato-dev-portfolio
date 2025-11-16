'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ProfileCard = () => {
  return (
    <aside className="w-full max-w-sm p-8 bg-[#F1F1F1] rounded-3xl shadow-lg flex flex-col h-auto">
      {/* Profile Picture */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/profile_pic.jpg"
          alt="Kenato's Profile Picture"
          width={100}
          height={100}
          className="rounded-md border-4 border-white shadow-md"
        />
      </div>

      {/* Name and Bio */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Kenneth Obul <span role="img" aria-label="waving hand">👋</span>
        </h1>
        <p className="mt-3 text-gray-600">
          A Passionate Full Stack Developer 👨‍💻 & Product Designer having 3 years of Experiences having worked in over 4+ counties nationwide .
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        
        <button className="flex items-center space-x-2 py-3 px-4 cursor-pointer rounded-md bg-blue-600 text-white font-semibold shadow-lg shadow-blue-700/50 hover:bg-blue-700 transition-all duration-300">
          <Send size={18} />
          <span>Send Mail</span>
        </button>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-300">
        <span className="font-semibold text-gray-800">Follow Me</span>
        <div className="flex space-x-3">
          <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-sm">
            <Facebook size={20} />
          </a>
          <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-sm">
            <Twitter size={20} />
          </a>
          <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-sm">
            <Instagram size={20} />
          </a>
          <a href="#" className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-300 shadow-sm">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default ProfileCard;