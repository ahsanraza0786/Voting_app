"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white sm:text-4xl mb-6"
          >
            Ready to Transform Your Voting Process?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of organizations that trust our platform for secure and efficient voting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white border-2 border-white hover:bg-white/10 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Contact Sales
            </Link>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-blue-100"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free Trial Available</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;