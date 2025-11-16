'use client';

import React from 'react';
import Image from 'next/image';
import { motion, TargetAndTransition } from 'framer-motion';
import {
  ArrowUpRight,
  LayoutGrid,
  Smartphone,
  PenTool,
  Globe,
  Component,
  Database,
} from 'lucide-react';

// --- Reusable Card Component ---
const Card = ({
  children,
  className,
  initial,
  animate,
  transition,
}: {
  children: React.ReactNode;
  className?: string;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
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

// --- Section Header Component ---
const SectionHeader = ({ title, linkText = "See All", linkUrl }: { title: string; linkText?: string; linkUrl: string }) => (
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
    <a href={linkUrl} className="text-blue-500 font-semibold hover:underline text-sm md:text-base flex-shrink-0 ml-4">
      {linkText}
    </a>
  </div>
);

const HeroSection = () => {
  return (
    <div className="flex flex-col gap-10 text-white">

      {/* === TOP SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

        {/* --------------------------------------------------------- */}
        {/* PROJECTS CARD — COMES FROM LEFT */}
        {/* --------------------------------------------------------- */}
        <Card
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <SectionHeader title="My Projects" linkUrl="/works" />

          <div className="max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent hover:scrollbar-thumb-gray-600 transition-all duration-300">
            <div className="flex flex-col gap-5">

              {/* Project 1 */}
              <a href="https://recipe-sharing-app-client.vercel.app" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-[#252525] rounded-2xl p-4 flex flex-col hover:scale-[1.02] transition duration-300">
                  <Image
                    src="/images/project_1.png"
                    alt="Recipe app"
                    width={320}
                    height={180}
                    className="rounded-lg mb-3 w-full object-cover"
                  />
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <h3 className="font-bold text-lg">Recp recipe app</h3>
                      <p className="text-sm text-gray-400">2025 September</p>
                    </div>
                    <div className="p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </a>

              {/* Project 2 */}
              <a href="https://everyoneschoice.netlify.app" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-[#252525] rounded-2xl p-4 flex flex-col hover:scale-[1.02] transition duration-300">
                  <Image
                    src="/images/project_2.png"
                    alt="Ecommerce Website"
                    width={320}
                    height={180}
                    className="rounded-lg mb-3 w-full object-cover"
                  />
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <h3 className="font-bold text-lg">Everyone&apos;s Choice Ecommerce Website</h3>
                      <p className="text-sm text-gray-400">2024 August</p>
                    </div>
                    <div className="p-2 rounded-full bg-gray-700 group-hover:bg-blue-600 transition">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </Card>

        {/* --------------------------------------------------------- */}
        {/* SERVICES CARD — FROM BOTTOM */}
        {/* --------------------------------------------------------- */}
        <Card
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-full flex flex-col justify-between"
        >
          <SectionHeader title="My Services" linkUrl="/services" />

          <ul className="space-y-3">
            {[
              { icon: <PenTool />, name: 'UI/UX Design' },
              { icon: <Smartphone />, name: 'Mobile App' },
              { icon: <LayoutGrid />, name: 'Dashboard Design' },
              { icon: <Globe />, name: 'Branding' },
              { icon: <Component />, name: 'Front End' },
              { icon: <Database />, name: 'Webflow Dev' },
            ].map((service, i) => (
              <li
                key={i}
                className="flex items-center space-x-4 px-4 py-3 rounded-2xl hover:bg-[#2B2B2B] hover:shadow transition cursor-pointer"
              >
                <div className="text-gray-300">{service.icon}</div>
                <span className="font-medium">{service.name}</span>
              </li>
            ))}
          </ul>
        </Card>

      </div>

      {/* === MIDDLE SECTION === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* EXPERT AREA — FROM BOTTOM */}
        <Card
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <SectionHeader title="My Expert Area" linkUrl="/about" />
          <div className="grid grid-cols-3 gap-5 text-center">
            {[
              { src: '/images/figma.svg', label: 'Figma' },
              { src: '/images/framer.svg', label: 'Express' },
              { src: '/images/expo.svg', label: 'Expo' },
              { src: '/images/mysql.svg', label: 'MySQL' },
              { src: '/images/mongodb.svg', label: 'MongoDB' },
              { src: '/images/postgresql.svg', label: 'PostgreSQL' },
              { src: '/images/react.svg', label: 'React.js' },
              { src: '/images/tailwindcss.svg', label: 'Tailwind CSS' },
              { src: '/images/node.svg', label: 'Node.js' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Image src={item.src} alt={item.label} width={40} height={40} />
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* WORK EXPERIENCE — FROM BOTTOM */}
        <Card
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <SectionHeader title="Work Experience" linkUrl="/about" />
          <ul className="space-y-5">
            {[
              { company: 'Google', role: 'Product Designer', years: '2023', logo: '/images/google.svg' },
              { company: 'Behance', role: 'Mid-level UI UX Designer', years: '2024', logo: '/images/behance.svg' },
              { company: 'Notion', role: 'Mid-level Product Designer', years: '2024-2025', logo: '/images/notion.svg' },
            ].map((job, i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image src={job.logo} alt={job.company} width={40} height={40} />
                  <div>
                    <p className="font-semibold">{job.company}</p>
                    <p className="text-sm text-gray-400">{job.role}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{job.years}</span>
              </li>
            ))}
          </ul>
        </Card>

      </div>
</div>
  );
};

export default HeroSection;