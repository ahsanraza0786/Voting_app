"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { FiShield, FiUsers, FiPieChart, FiLock, FiSmartphone, FiGlobe, FiClock, FiCheck, FiDatabase } from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "Advanced Security",
    description: "State-of-the-art encryption and security measures to protect your votes.",
    details: [
      "End-to-end encryption",
      "Two-factor authentication",
      "Blockchain technology",
      "DDoS protection"
    ]
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: "User Management",
    description: "Comprehensive user management and role-based access control.",
    details: [
      "Role-based permissions",
      "Voter verification",
      "Admin dashboard",
      "User activity logs"
    ]
  },
  {
    icon: <FiPieChart className="w-8 h-8" />,
    title: "Real-time Analytics",
    description: "Live vote counting and detailed analytics for informed decision-making.",
    details: [
      "Live vote tracking",
      "Detailed reports",
      "Data visualization",
      "Export capabilities"
    ]
  },
  {
    icon: <FiLock className="w-8 h-8" />,
    title: "Fraud Prevention",
    description: "Advanced algorithms to detect and prevent electoral fraud.",
    details: [
      "Duplicate vote prevention",
      "IP tracking",
      "Audit trails",
      "Suspicious activity detection"
    ]
  },
  {
    icon: <FiSmartphone className="w-8 h-8" />,
    title: "Multi-platform Support",
    description: "Vote from any device with our responsive platform.",
    details: [
      "Mobile responsive",
      "Desktop optimized",
      "Tablet friendly",
      "Offline capabilities"
    ]
  },
  {
    icon: <FiGlobe className="w-8 h-8" />,
    title: "Global Accessibility",
    description: "Access your voting platform from anywhere in the world.",
    details: [
      "Multi-language support",
      "24/7 availability",
      "Low bandwidth mode",
      "Cross-browser compatibility"
    ]
  },
  {
    icon: <FiClock className="w-8 h-8" />,
    title: "Automated Scheduling",
    description: "Set up and schedule elections with ease.",
    details: [
      "Automated start/end",
      "Time zone support",
      "Reminder notifications",
      "Calendar integration"
    ]
  },
  {
    icon: <FiDatabase className="w-8 h-8" />,
    title: "Data Management",
    description: "Efficient handling of voter data and election results.",
    details: [
      "Secure data storage",
      "Automated backups",
      "Data encryption",
      "Easy data import/export"
    ]
  }
];

export default function Features() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Powerful Features for Modern Voting
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Discover all the tools and features that make our platform the leading choice for digital voting solutions.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <FiCheck className="w-5 h-5 mr-2 text-green-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            Ready to Experience These Features?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Request Demo
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}