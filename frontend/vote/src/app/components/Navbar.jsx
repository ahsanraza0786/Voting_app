"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHome, FiCheckCircle, FiGrid, FiInfo, FiLogIn, FiUserPlus } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [pathname]); // Re-check when pathname changes

  const navigation = [
    { name: "Home", href: "/", icon: <FiHome className="w-5 h-5" /> },
    { name: "Elections", href: "/elections", icon: <FiCheckCircle className="w-5 h-5" /> },
    { name: "Features", href: "/features", icon: <FiGrid className="w-5 h-5" /> },
    { name: "About", href: "/about", icon: <FiInfo className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-indigo-900/95 to-blue-900/95 backdrop-blur-lg shadow-lg" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold text-white hover:text-blue-200 transition-all duration-300"
              >
                VoteSmart
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    className={`group relative flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-white bg-white/20"
                        : "text-gray-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="relative">
                      {item.name}
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
            {!isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/signup"
                  className="group relative flex items-center px-6 py-2 rounded-lg text-sm font-medium bg-white/10 text-white transition-all duration-300 ml-4 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <FiUserPlus className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    router.push('/');
                  }}
                  className="group relative flex items-center px-6 py-2 rounded-lg text-sm font-medium bg-white/10 text-white transition-all duration-300 ml-4 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <FiLogIn className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Logout</span>
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-indigo-900/95 to-blue-900/95 backdrop-blur-lg border-t border-white/10">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                        isActive
                          ? "text-white bg-white/20"
                          : "text-gray-200 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3 transition-transform duration-300 group-hover:scale-110">
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              {!isAuthenticated ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/signup"
                    className="group relative flex items-center px-3 py-2 rounded-lg text-base font-medium text-white transition-all duration-300 mt-2 overflow-hidden"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <FiUserPlus className="w-5 h-5 mr-3 relative z-10" />
                    <span className="relative z-10">Sign Up</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      setIsAuthenticated(false);
                      router.push('/');
                      setIsOpen(false);
                    }}
                    className="group relative flex items-center px-3 py-2 rounded-lg text-base font-medium text-white transition-all duration-300 mt-2 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <FiLogIn className="w-5 h-5 mr-3 relative z-10" />
                    <span className="relative z-10">Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}