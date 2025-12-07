'use client';

import React from 'react';
import Image from 'next/image';
import { motion,} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import MainLayout from '../components/MainLayout'; // Assuming MainLayout path is correct

// --- Data Structure for Projects ---
interface Project {
  title: string;
  category: string; // Keeping this for the date/subtitle line, even though the screenshot shows category
  date: string;
  imagePath: string; // Placeholder image path
  liveUrl: string; // External live URL
  delay: number; // for staggering animation
}

// --- Placeholder Project Data (6 Projects with Live URLs) ---
const projectsData: Project[] = [
  {
    title: "Recp Recipe Sharing App",
    category: "Full-Stack Web Development",
    date: "2025 September",
    imagePath: "/images/project_1.png",
    liveUrl: "https://recipe-sharing-app-client.vercel.app", // Placeholder URL
    delay: 0.1,
  },
  {
    title: "Everyone's Choice Ecommerce Website",
    category: "Full-Stack Web Development",
    date: "2024 August",
    imagePath: "/images/project_2.png",
    liveUrl: "https://everyoneschoice.netlify.app", // Placeholder URL
    delay: 0.2,
  },
  {
    title: "Lipa Haraka Online Payment System",
    category: "Full-Stack Web Development",
    date: "2025 October",
    imagePath: "/images/project_3.png",
    liveUrl: "https://lipa-haraka-mobile-money-e-platform.vercel.app", // Placeholder URL
    delay: 0.3,
  },
  {
    title: "Resume Builder App",
    category: "Web Development",
    date: "2024 December",
    imagePath: "/images/project_4.png",
    liveUrl: "https://resume-react-builder.netlify.app", // Placeholder URL
    delay: 0.4,
  },
  {
    title: "MPI Kenya App",
    category: "Mobile App Development",
    date: "2025 June",
    imagePath: "/images/project_5.png",
    liveUrl: "https://play.google.com/store/apps/details?id=com.peaceinitiative.mpikenya&hl=en", // Placeholder URL
    delay: 0.5,
  },
  {
    title: "Ronil To do app",
    category: "Frontend Web Development",
    date: "2023 May",
    imagePath: "/images/project_6.png",
    liveUrl: "https://pro-to-app-frontend.vercel.app", // Placeholder URL
    delay: 0.6,
  },
];

// --- Section Header Component (for consistency) ---
const SectionHeader = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex justify-between items-center mb-5"
  >
    <h2 className="text-xl md:text-3xl font-bold text-white">{title}</h2>
  </motion.div>
);

// --- Individual Project Card Component ---
const ProjectCard: React.FC<Project> = ({ title, date, imagePath, liveUrl, delay }) => (
  // Use a standard 'a' tag for external link, opening in a new tab
  <a 
    href={liveUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group block" // Make the card a block-level link
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120 }}
      viewport={{ once: true }}
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 10px 30px rgba(255,255,255,0.08)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-[#2B2B2B] rounded-3xl p-4 flex flex-col cursor-pointer h-full
                   hover:bg-[#353535] duration-300 border border-transparent
                   hover:border-white/10 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.05)]"
      >
        <div className="relative w-full rounded-2xl overflow-hidden mb-4">
          <Image
            src={imagePath}
            alt={title}
            width={320} // Fixed width as requested
            height={180} // Fixed height as requested
            className="w-full h-auto object-cover rounded-2xl transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div>
            <h3 className="font-bold text-lg text-white">{title}</h3>
            <p className="text-sm text-gray-400">{date}</p>
          </div>
          {/* Arrow icon */}
          <div className="p-3 rounded-full bg-[#3D3D3D] group-hover:bg-blue-600 transition duration-300">
            <ArrowUpRight size={20} className="text-white" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  </a>
);


// --- Works Page Component ---
const WorksPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        
        {/* Header - "My Projects" */}
        <SectionHeader title="My Projects" />

        {/* Projects Grid */}
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
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index} 
              {...project} 
            />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default WorksPage;