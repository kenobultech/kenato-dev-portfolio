// FILE: pages/about/index.tsx

'use client';

// UPDATED: Added useState to control which testimonials are visible
import React, { useRef, useEffect, useState } from 'react'; 
import Image from 'next/image';
import MainLayout from '../components/MainLayout';
import { Clock, Users, Briefcase } from 'lucide-react';
import { motion, TargetAndTransition } from 'framer-motion';


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

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
  </div>
);

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => (
  <div className="flex flex-col items-center p-4 rounded-xl bg-[#2B2B2B] text-center">
    <Icon size={24} className="text-blue-500 mb-2" />
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, imageSrc }: { quote: string; name: string; role: string; imageSrc: string }) => (
  // Removed min-w class to allow the grid layout to control the width
  <Card className="bg-[#2B2B2B] flex flex-col h-full"> 
    <p className="text-gray-300 mb-6 flex-grow">{quote}</p>
    <div className="flex items-center space-x-4 mt-auto">
      <Image
        src={imageSrc}
        alt={name}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <div>
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </Card>
);

const AboutPage = () => {
  const workExperience = [
    { company: 'Google', role: 'Product Designer', years: '2023', logo: '/images/google.svg' },
              { company: 'Behance', role: 'Mid-level UI UX Designer', years: '2024', logo: '/images/behance.svg' },
              { company: 'Notion', role: 'Mid-level Product Designer', years: '2024-2025', logo: '/images/notion.svg' },
  ];

  const expertArea = [
    { src: '/images/figma.svg', label: 'Figma' },
    { src: '/images/framer.svg', label: 'Express' },
    { src: '/images/expo.svg', label: 'Expo' },
    { src: '/images/mysql.svg', label: 'MySQL' },
    { src: '/images/mongodb.svg', label: 'MongoDB' },
    { src: '/images/postgresql.svg', label: 'PostgreSQL' },
    { src: '/images/react.svg', label: 'React.js' },
    { src: '/images/tailwindcss.svg', label: 'Tailwind CSS' },
    { src: '/images/node.svg', label: 'Node.js' },
  ];

  // *** NEW PERSONALIZED TESTIMONIALS FOR KENNETH OBUL ***
  const testimonials = [
    {
      quote:
        "Kenneth builds mobile and web apps with precision and elegance. His ability to translate ideas into clean, functional code is unmatched.",
      name: "Daniel Mwangi",
      role: "Startup Founder",
      image: "/images/testimonial_1.jpeg",
    },
    {
      quote:
        "Working with Kenneth was seamless. He develops interfaces that feel natural, fast, and visually stunning. His React Native work is top-tier.",
      name: "Sarah K.",
      role: "Project Manager",
      image: "/images/testimonial_3.jpeg",
    },
    {
      quote:
        "What sets Kenneth apart is his problem-solving mindset. He builds systems that scale beautifully and deliver consistent performance.",
      name: "Angela Roberts",
      role: "Tech Lead",
      image: "/images/testimonial_2.jpeg",
    },
    {
      quote:
        "Kenneth designed and developed our entire system with professionalism and creativity. His work ethic and talent are extraordinary.",
      name: "Willy Baya",
      role: "CEO",
      image: "/images/testimonial_4.jpeg",
    },
  ];

  // STATE and LOGIC for Two-Up Carousel
  const [currentIndex, setCurrentIndex] = useState(0); 
  const SLIDE_INTERVAL = 5000; 
  
  // The carousel controls the index and displays a pair of cards.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 2;
        // Check if the next pair is beyond the testimonials array length.
        // If so, loop back to the first pair (index 0).
        if (nextIndex >= testimonials.length) {
          return 0; 
        }
        return nextIndex;
      });
    }, SLIDE_INTERVAL);
    
    return () => clearInterval(timer);
  }, [testimonials.length]); // Dependency on length

  // Get the current pair of testimonials to display
  const currentTestimonials = testimonials.slice(currentIndex, currentIndex + 2);
  // END LOGIC


  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">

        {/* HERO */}
        <Card initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white">
          <div className="flex items-center space-x-4 mb-6">
            <Image
              src="/images/about_boy.png"
              alt="Kenneth Obul"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            Hey, I&apos;m <span className="text-blue-500">Kenneth Obul</span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Full Stack Web & Mobile Developer
          </h2>

          <p className="text-lg text-gray-300 max-w-2xl">
            I build clean, responsive, and modern digital products. Whether mobile or web, my focus is always on performance, design precision, and user experience.
          </p>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <StatCard icon={Briefcase} value="10+" label="Projects Completed" />
          <StatCard icon={Users} value="15+" label="Happy Clients" />
          <StatCard icon={Clock} value="3+" label="Years Experience" />
        </div>

        {/* WORK + EXPERT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <Card initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <SectionHeader title="Work Experience" />
            <ul className="space-y-5">
              {workExperience.map((job, i) => (
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

          <Card initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <SectionHeader title="My Expert Area" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-center">
              {expertArea.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Image src={item.src} alt={item.label} width={40} height={40} />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* TESTIMONIALS - Now a controlled, auto-sliding component */}
        <div className="flex flex-col space-y-5">
          <SectionHeader title="What Clients Say!" />

          {/* This motion.div acts as the slide container for the current pair.
              The changing 'key' forces the component and its children to re-render, 
              triggering the initial/animate transition (slide/fade effect). */}
          <motion.div 
            key={currentIndex} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            // Grid layout to display the pair side-by-side as per the design
            className="grid grid-cols-1 md:grid-cols-2 gap-6" 
          >
            {currentTestimonials.map((testimonial, i) => (
              <TestimonialCard
                key={i}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                imageSrc={testimonial.image}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </MainLayout>
  );
};

export default AboutPage;