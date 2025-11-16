"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home as HomeIcon,
  User,
  Layers,
  Briefcase,
  BookOpen,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

// --- NavItem Component ---
type NavItemProps = {
  name: string;
  href: string;
  icon?: React.ElementType;
  active?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
};

const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  icon: Icon,
  active = false,
  hasDropdown = false,
  dropdownItems = [],
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const baseClasses =
    "flex items-center space-x-2 py-2 px-4 rounded-full transition-all duration-200 relative z-10";
  const activeClasses = "bg-blue-600 text-white";
  const inactiveClasses =
    "bg-[#252525] text-gray-300 hover:bg-blue-500 hover:text-white";

  const buttonClasses = active ? activeClasses : inactiveClasses;

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div className={`${baseClasses} ${buttonClasses}`}>
        {Icon && <Icon size={18} />}
        <Link href={href}>
          <span>{name}</span>
        </Link>
        {hasDropdown && (
          <button
            onClick={handleDropdownToggle}
            className="ml-1 focus:outline-none"
            type="button"
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                isDropdownVisible ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}
      </div>

      {hasDropdown && isDropdownVisible && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max rounded-xl overflow-hidden shadow-xl z-20 bg-[#2b2b2b] border border-[#333]">
          {dropdownItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="block w-full py-2 px-6 text-gray-200 hover:bg-blue-500 hover:text-white transition-colors duration-150 text-sm">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Navbar Component ---
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About", href: "/about", icon: User },
    {
      name: "Services",
      href: "/services",
      icon: Layers,
      hasDropdown: true,
      dropdownItems: [{ label: "Service Details", href: "/services/details" }],
    },
    { name: "Works", href: "/works", icon: Briefcase },
    { name: "Blogs", href: "/blogs", icon: BookOpen },
  ];

  return (
    <div className="p-4">
      <nav className="max-w-7xl mx-auto px-4 py-2 rounded-2xl bg-[#202020] shadow-lg shadow-black/40">
        <div className="flex justify-between items-center h-16">
          <div className="text-3xl font-extrabold tracking-tight select-none">
            <span className="text-blue-600">Ken</span>
            <span className="text-gray-100">ato</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-2 items-center">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return <NavItem key={link.name} {...link} active={isActive} />;
            })}
          </div>

          <Link href="/contact">
            <button className="hidden lg:block py-2 px-6 rounded-full text-white font-semibold bg-blue-600 hover:bg-white hover:text-black transition-all duration-200 ml-4">
              Let&apos;s Talk
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SLIDING MOBILE MENU (Right Side) */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-[#202020] shadow-xl z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-[#333]">
          <span className="text-xl font-semibold text-white">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-3 p-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return <NavItem key={link.name} {...link} active={isActive} />;
          })}

          <Link href="/contact">
            <button className="w-full py-3 px-6 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-500 transition-all duration-200 mt-3">
              Let&apos;s Talk
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
