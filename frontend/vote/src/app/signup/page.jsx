"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle, FiLoader, FiPhone, FiMapPin, FiHash, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../../styles/signup.css';



export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    address: '',
    mobile: '',
    aadharCardNumber: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.fullName || !formData.email || !formData.age || !formData.address || !formData.aadharCardNumber) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^\d{12}$/.test(formData.aadharCardNumber)) {
      setError('Aadhar Card Number must be exactly 12 digits');
      return false;
    }
    const ageNum = Number(formData.age);
    if (Number.isNaN(ageNum) || ageNum < 18) {
      setError('You must be at least 18 years old to register');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1 && validateStep1()) {
      setStep(2);
      return;
    }

    if (step === 2 && !validateStep2()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${base}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          age: Number(formData.age),
          address: formData.address,
          mobile: formData.mobile,
          aadharCardNumber: formData.aadharCardNumber
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const msg = data.error || data.message || 'Something went wrong';
        throw new Error(msg);
      }

      // Save token and show success
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      setStep(3);
      setTimeout(() => {
        router.push('/');
      }, 1800);

    } catch (err) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative"
      >
        {/* Glass Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Create Account
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-blue-200"
            >
              Join our secure voting platform
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <div className="relative mb-8">
            <div className="h-1 bg-white/10 rounded-full">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : step === 2 ? "100%" : "100%" }}
                className="h-full bg-blue-500 rounded-full"
              />
            </div>
            <div className="flex justify-between -mt-2">
              <motion.div
                animate={{ scale: step >= 1 ? 1.2 : 1 }}
                className={`w-4 h-4 rounded-full ${step >= 1 ? 'bg-blue-500' : 'bg-white/20'}`}
              />
              <motion.div
                animate={{ scale: step >= 2 ? 1.2 : 1 }}
                className={`w-4 h-4 rounded-full ${step >= 2 ? 'bg-blue-500' : 'bg-white/20'}`}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Full Name Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Age Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Age</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="18"
                    />
                  </div>
                </div>

                {/* Address Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>
                </div>

                {/* Mobile Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Mobile (optional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="(+91) 9876543210"
                    />
                  </div>
                </div>

                {/* Aadhar Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Aadhar Card Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHash className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type="text"
                      name="aadharCardNumber"
                      value={formData.aadharCardNumber}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="123412341234"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Password Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                      ) : (
                        <FiEye className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="group">
                  <label className="block text-blue-200 text-sm font-medium mb-2">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-blue-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-white/10 w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                      ) : (
                        <FiEye className="h-5 w-5 text-blue-300 hover:text-blue-200" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheckCircle className="w-16 h-16 text-green-400" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-xl text-white"
                >
                  Account Created Successfully!
                </motion.p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Submit Button */}
            {step < 3 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
              >
                {loading ? (
                  <FiLoader className="w-5 h-5 animate-spin" />
                ) : (
                  step === 1 ? "Continue" : "Create Account"
                )}
              </motion.button>
            )}

            {/* Login Link */}
            <p className="text-center text-blue-200">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}