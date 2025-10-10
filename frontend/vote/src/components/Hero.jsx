"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiShield, FiLock, FiSmartphone } from "react-icons/fi";
import '../styles/hero.css';


const Hero = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin');
    }
  }, []);
  return (
    <div className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient"></div>
      
      {/* Animated Circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-overlay filter blur-3xl glow-effect"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-overlay filter blur-3xl glow-effect" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-violet-600/20 rounded-full mix-blend-overlay filter blur-3xl glow-effect" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
                  Revolutionizing
                </span>
                <span className="block text-white mt-2">Digital Democracy</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100/90 mb-8 max-w-xl"
            >
              Experience the future of voting with our blockchain-powered platform. 
              Secure, transparent, and accessible from anywhere in the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Link
                href="/signup"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-blue-900 bg-white overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-indigo-100 transition-all duration-300 ease-out group-hover:w-full"></div>
                <span className="relative flex items-center">
                  Get Started
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </Link>
              {isAdmin && (
                <Link
                  href="/election-management"
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl text-white overflow-hidden"
                >
                  <div className="absolute inset-0 border-2 border-white rounded-xl"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                  <span className="relative">Create Election</span>
                </Link>
              )}
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg lg:mx-0"
            >
              {[
                { text: "End-to-end encryption", delay: 0 },
                { text: "Real-time results", delay: 0.1 },
                { text: "Mobile-friendly", delay: 0.2 },
                { text: "24/7 Support", delay: 0.3 }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + feature.delay }}
                  className="flex items-center space-x-3 bg-white/5 rounded-lg px-4 py-3 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <FiCheck className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="text-blue-50">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full h-[600px]">
              {/* Main Card */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 p-8 floating-card overflow-hidden"
              >
                <div className="relative h-full">
                  {/* Card Content */}
                  <div className="text-white space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-semibold">Voting Portal</div>
                      <FiShield className="w-8 h-8 text-blue-300" />
                    </div>
                    
                    {/* Interactive Elements */}
                    <div className="mt-8 space-y-4">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <FiLock className="w-5 h-5 text-blue-300" />
                          <span>End-to-end Encryption</span>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <FiSmartphone className="w-5 h-5 text-blue-300" />
                          <span>Vote from Any Device</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Animated Graph */}
                    <div className="absolute bottom-8 left-0 right-0">
                      <div className="h-32 flex items-end justify-around">
                        {[40, 67, 83, 72, 55, 90, 76].map((height, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1,
                              repeat: Infinity,
                              repeatType: "reverse",
                              repeatDelay: 2
                            }}
                            className="w-4 bg-gradient-to-t from-blue-500/50 to-indigo-500/50 rounded-t-lg"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [-20, 0, -20],
                  rotate: [-5, 5, -5]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-2xl backdrop-blur-sm border border-white/20 p-4 flex items-center justify-center"
              >
                <FiShield className="w-12 h-12 text-blue-300" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [5, -5, 5]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-violet-400/20 rounded-2xl backdrop-blur-sm border border-white/20 p-4"
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="text-white/80 text-sm">Active Voters</div>
                  <div className="text-3xl font-bold text-white">2.5M+</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;