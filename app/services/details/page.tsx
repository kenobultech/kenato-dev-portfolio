"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import MainLayout from "../../components/MainLayout";
import { motion, TargetAndTransition } from "framer-motion";
import {
  Search,
  Code,
  Server,
  
  CheckCircle,
  Clock,
  
  Database,
} from "lucide-react";

// --- Card Component (Re-used/Redefined for this page) ---
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

// --- Section Header Component ---
const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true, amount: 0.5 }}
    className="mb-8"
  >
    {subtitle && <p className="text-blue-400 font-semibold mb-2">{subtitle}</p>}
    <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
  </motion.div>
);

// --- Process Step Card Component ---
interface ProcessStepProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const ProcessStepCard: React.FC<ProcessStepProps> = ({
  icon: Icon,
  title,
  description,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
    className="flex items-start space-x-4 bg-[#2B2B2B] rounded-2xl p-6 border border-[#333] hover:border-blue-600/50 transition-colors duration-300"
  >
    <div className="p-3 rounded-full bg-blue-600/20 text-blue-400">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </motion.div>
);

// ---------------- PAGE LAYOUT ----------------

const ServiceUIDetailPage = () => {
  const processSteps = [
    {
      icon: Search,
      title: "1. Requirements & System Planning",
      description:
        "Understanding business goals, defining features, user flows, and system architecture.",
    },
    {
      icon: Code,
      title: "2. Frontend Development",
      description:
        "Building responsive, high-performance interfaces using React, Next.js, and Tailwind.",
    },
    {
      icon: Server,
      title: "3. Backend & Database Setup",
      description:
        "Developing secure APIs with Node.js/Express and integrating MongoDB or PostgreSQL.",
    },
    {
      icon: CheckCircle,
      title: "4. Testing & Deployment",
      description:
        "Functional testing, performance optimization, and deployment to production environments.",
    },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        {/* --- 1. Service Hero/Intro Card --- */}
        <Card
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 sm:p-6 md:p-8 lg:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                Software Development
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Modern Web & Mobile{" "}
                <span className="text-blue-500">Development</span>
              </h1>

              <p className="text-lg text-gray-400 mb-6">
                I build scalable, intuitive and high-performance applications
                using the latest JavaScript technologies. From full-stack web
                platforms to mobile apps, I deliver production-ready systems
                optimized for both users and business growth.
              </p>

              <div className="flex space-x-4">
                <button className="py-2.5 px-6 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-500 transition-all duration-200">
                  Start Your Project
                </button>
              </div>
            </div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative w-full h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/Coding.jpeg"
                alt="Software Development"
                layout="fill"
                objectFit="cover"
                className="brightness-75"
              />
            </motion.div>
          </div>
        </Card>

        {/* --- 2. Development Process Section --- */}
        <SectionHeader
          title="My Development Workflow"
          subtitle="End-to-End Execution"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {processSteps.map((step, index) => (
            <ProcessStepCard key={index} {...step} delay={0.1 + index * 0.1} />
          ))}
        </motion.div>

        {/* --- 3. Key Deliverables & Timelines --- */}
        <Card>
          <SectionHeader
            title="Project Metrics"
            subtitle="What You Can Expect"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-blue-600/30"
            >
              <Code size={40} className="text-blue-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">React / Next.js</h3>
              <p className="text-gray-400 mt-1">Frontend Stack</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-blue-600/30"
            >
              <Database size={40} className="text-blue-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">
                Node.js & MongoDB
              </h3>
              <p className="text-gray-400 mt-1">Backend & Database</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-blue-600/30"
            >
              <Clock size={40} className="text-blue-500 mx-auto mb-3" />
              <h3 className="text-3xl font-bold text-white">2–6 Weeks</h3>
              <p className="text-gray-400 mt-1">Typical Project Duration</p>
            </motion.div>
          </div>
        </Card>
        {/* --- 4. Pricing Section --- */}
        <Card className="mt-4">
          <SectionHeader
            title="Pricing Packages"
            subtitle="Flexible & Transparent Rates"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* --- Frontend Package --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333] hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Frontend Development
              </h3>
              <p className="text-gray-400 mb-4">
                Perfect for UI-focused websites.
              </p>

              <p className="text-4xl font-extrabold text-blue-400 mb-4">
                KSh 40,000
              </p>

              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✔ Responsive UI (React / Next.js)</li>
                <li>✔ Tailwind CSS</li>
                <li>✔ SEO-Ready Structure</li>
                <li>✔ Deployment Included</li>
              </ul>

              
            </motion.div>

            {/* --- Fullstack Package --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-blue-600/40 shadow-lg hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Fullstack Development
              </h3>
              <p className="text-gray-400 mb-4">
                Ideal for complete systems & dashboards.
              </p>

              <p className="text-4xl font-extrabold text-blue-400 mb-4">
                KSh 80,000
              </p>

              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✔ MERN or PERN Stack</li>
                <li>✔ Secure Backend APIs</li>
                <li>✔ Admin Panel</li>
                <li>✔ JWT Authentication</li>
                <li>✔ Database Integration (MongoDB / PostgreSQL)</li>
              </ul>

              
            </motion.div>

            {/* --- Mobile App Package --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333] hover:border-blue-500 transition"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Mobile App Development
              </h3>
              <p className="text-gray-400 mb-4">
                Cross-platform React Native apps.
              </p>

              <p className="text-4xl font-extrabold text-blue-400 mb-4">
                KSh 120,000+
              </p>

              <ul className="space-y-2 text-gray-300 text-sm">
                <li>✔ React Native + Expo</li>
                <li>✔ Node.js Backend</li>
                <li>✔ MongoDB Integration</li>
                <li>✔ Authentication & Push Notifications</li>
                <li>✔ Google Play Ready</li>
              </ul>

              
            </motion.div>
          </div>

          {/* --- Payment Structure --- */}
          <div className="mt-10 p-6 bg-[#2B2B2B] border border-[#333] rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Payment Structure
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                💰 <b>40% Upfront</b> – Project setup & design
              </li>
              <li>
                💰 <b>40% Midway</b> – Core development complete
              </li>
              <li>
                💰 <b>20% Final</b> – Final delivery & deployment
              </li>
            </ul>
          </div>
        </Card>

        {/* --- 5. Why Work With Me Section --- */}
        <Card className="mt-4">
          <SectionHeader
            title="Why Work With Me"
            subtitle="Proven Skillset & Reliability"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333]"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Deep Technical Expertise
              </h3>
              <p className="text-gray-400 text-sm">
                With strong experience in MERN, PERN, and React Native, I build
                scalable, production-ready systems with clean, maintainable
                code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333]"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Strong UI Intuition
              </h3>
              <p className="text-gray-400 text-sm">
                Although I am primarily a software developer, I have sharp UI/UX
                instincts that help me create visually refined and user-friendly
                interfaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333]"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Real-World Experience
              </h3>
              <p className="text-gray-400 text-sm">
                From building the MPI Kenya mobile app to developing e-commerce,
                SaaS, and enterprise solutions, I bring real, practical
                experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
              viewport={{ once: true }}
              className="bg-[#2B2B2B] p-6 rounded-2xl border border-[#333]"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Clear Communication
              </h3>
              <p className="text-gray-400 text-sm">
                I maintain constant communication, frequent updates, and
                transparent reporting—making the entire development process
                smooth and stress-free.
              </p>
            </motion.div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServiceUIDetailPage;
