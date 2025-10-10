"use client";
import { motion } from "framer-motion";
import { FiLock, FiUser, FiUserCheck, FiPieChart, FiDatabase, FiClipboard, FiDownload, FiShield, FiClock, FiCheckCircle } from "react-icons/fi";

const adminFeatures = [
  {
    icon: <FiLock className="w-6 h-6" />,
    title: "Secure Voting",
    description: "End-to-end encryption ensures your vote remains confidential and tamper-proof."
  },
  {
    icon: <FiUserCheck className="w-6 h-6" />,
    title: "Easy Authentication",
    description: "Simple and secure authentication process for verified voters."
  },
  {
    icon: <FiPieChart className="w-6 h-6" />,
    title: "Real-time Results",
    description: "Watch election results unfold in real-time with interactive dashboards."
  },
  {
    icon: <FiShield className="w-6 h-6" />,
    title: "Fraud Prevention",
    description: "Advanced algorithms detect and prevent any attempts at electoral fraud."
  },
  {
    icon: <FiClock className="w-6 h-6" />,
    title: "24/7 Accessibility",
    description: "Vote at your convenience, anytime and anywhere."
  },
  {
    icon: <FiCheckCircle className="w-6 h-6" />,
    title: "Vote Verification",
    description: "Verify your vote was correctly recorded and counted."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-16"
          >
            Everything you need for secure and transparent voting
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;