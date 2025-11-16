// FILE: services/page.tsx

'use client';

import React from 'react';
import MainLayout from '../components/MainLayout';
import { 
  ArrowRight,
  Layers,
  Smartphone,
  LayoutGrid,
  Box,
  Component,
  SquareDashedKanban,
} from 'lucide-react';
import { motion, TargetAndTransition } from 'framer-motion';

// ---------------- COMPONENTS ----------------

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
    className={className}
  >
    {children}
  </motion.div>
);

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

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, delay }) => (

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 120 }}
    viewport={{ once: true }}
  >
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0px 10px 30px rgba(255,255,255,0.08)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-[#2B2B2B] rounded-3xl p-6 md:p-8 cursor-pointer 
                 hover:bg-[#353535] duration-300 group border border-transparent
                 hover:border-white/10 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.05)]"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <Icon size={40} className="text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-8 flex-grow">{description}</p>

        <motion.div
          className="mt-auto"
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <ArrowRight size={24} className="text-white" />
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

// ---------------- SERVICES DATA ----------------

const servicesData = [
  { 
    title: "UI/UX Design", 
    description: "Practical UI/UX designer with 5 years of hands-on experience shaping clean, modern digital interfaces for web and mobile projects.", 
    icon: Layers, 
    delay: 0.1 
  },
  { 
    title: "Mobile App Development", 
    description: "React Native developer building production-ready mobile applications, including the MPI Kenya app with authentication and backend APIs.", 
    icon: Smartphone, 
    delay: 0.2 
  },
  { 
    title: "Dashboard & Admin Panel Design", 
    description: "Developer experienced in creating structured admin dashboards using React, Node.js, and MongoDB, ensuring clarity, performance, and seamless data flow.", 
    icon: LayoutGrid, 
    delay: 0.3 
  },
  { 
    title: "Branding & Digital Identity", 
    description: "Strategic creator who blends design and vision to craft brand identities that communicate value and long-term purpose.", 
    icon: Box, 
    delay: 0.4 
  },
  { 
    title: "Frontend Engineering", 
    description: "Frontend engineer with mastery in React, Next.js, Tailwind CSS, delivering responsive and high-performance web interfaces.", 
    icon: Component, 
    delay: 0.5 
  },
  { 
    title: "Full-Stack Web Solutions", 
    description: "Developer delivering MERN, PERN, and SAAS platforms—from API development to deployment—driven by an entrepreneurial vision for scalable tech products.", 
    icon: SquareDashedKanban, 
    delay: 0.6 
  },
];

// ---------------- PAGE ----------------

const ServicesPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        
        <SectionHeader title="Services I Offered" />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
