"use client";
import { motion } from "framer-motion";
import { FiUserPlus, FiCheck, FiPieChart } from "react-icons/fi";

const steps = [
  {
    icon: <FiUserPlus className="w-8 h-8" />,
    title: "Register & Verify",
    description: "Create your account and verify your identity using our secure authentication process."
  },
  {
    icon: <FiCheck className="w-8 h-8" />,
    title: "Cast Your Vote",
    description: "Login during the election period and cast your vote securely from any device."
  },
  {
    icon: <FiPieChart className="w-8 h-8" />,
    title: "Track Results",
    description: "Monitor the election results in real-time through our interactive dashboard."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Three simple steps to participate in the election
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/4 w-full">
                  <div className="h-0.5 bg-blue-200 transform translate-y-2"></div>
                </div>
              )}

              {/* Step Circle */}
              <div className="relative">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;