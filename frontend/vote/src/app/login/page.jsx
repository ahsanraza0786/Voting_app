// "use client";
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiAlertCircle } from 'react-icons/fi';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLoginButton from '../../components/GoogleLoginButton.jsx';



// const base = process.env.NEXT_PUBLIC_API_BASE;


// export default function Login() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     aadharCardNumber: '',
//     password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [shake, setShake] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${base}/user/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           aadharCardNumber: formData.aadharCardNumber,
//           password: formData.password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       // Store the token
//       if (data.token) localStorage.setItem('token', data.token);

//       // Fetch user profile to determine role
//       let role = null;
//       try {
//         const profileRes = await fetch(`${base}/user/profile`, {
//           headers: { 'Authorization': `Bearer ${data.token}` }
//         });
//         const profileData = await profileRes.json();
//         role = profileData.user?.role;
//         if (role) localStorage.setItem('role', role);
//       } catch (e) {
//         // fallback: go to dashboard
//         router.push('/dashboard');
//         return;
//       }
//       // Route based on role
//       if (role === 'admin') {
//         router.push('/election-management');
//       } else {
//         router.push('/voting-booth');
//       }

//     } catch (err) {
//       setError(err.message || 'Invalid credentials');
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
//         {/* Animated background elements */}
//         <div className="absolute inset-0">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//           <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//         </div>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8 relative"
//       >
//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <motion.h2
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-3xl font-bold text-white mb-2"
//             >
//               Welcome Back
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="text-blue-200"
//             >
//               Sign in to your account
//             </motion.p>
//           </div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             className="space-y-6"
//             animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
//             transition={{ duration: 0.4 }}
//           >
//             {/* Email Input */}
//             <div>
//               <label className="block text-blue-200 text-sm font-medium mb-2">
//                 Aadhar Card Number
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiMail className="h-5 w-5 text-blue-300" />
//                 </div>
//                 <input
//                   type="text"
//                   name="aadharCardNumber"
//                   value={formData.aadharCardNumber}
//                   onChange={handleChange}
//                   required
//                   className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="123412341234"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-blue-200 text-sm font-medium mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FiLock className="h-5 w-5 text-blue-300" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="bg-white/10 w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 >
//                   {showPassword ? (
//                     <FiEyeOff className="h-5 w-5 text-blue-300 hover:text-blue-200 transition-colors" />
//                   ) : (
//                     <FiEye className="h-5 w-5 text-blue-300 hover:text-blue-200 transition-colors" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me and Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-200">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 {/* <Link
//                   href="/forgot-password"
//                   className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
//                 >
//                   Forgot password?
//                 </Link> */}
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center gap-2 text-red-400 text-sm"
//               >
//                 <FiAlertCircle className="h-4 w-4" />
//                 <span>{error}</span>
//               </motion.div>
//             )}

//             {/* Submit Button */}
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading}
//               className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
//             >
//               {loading ? (
//                 <FiLoader className="w-5 h-5 animate-spin" />
//               ) : (
//                 'Sign In'
//               )}
//             </motion.button>

//             {/* Sign Up Link */}
//             <p className="text-center text-blue-200">
//               Don't have an account?{' '}
//               <Link
//                 href="/signup"
//                 className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </motion.form>

//           {/* Social Login Options */}
//           <div className="mt-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-white/20"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-transparent text-blue-200">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-center">
//               <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
//                 <GoogleLoginButton />
//               </GoogleOAuthProvider>
//             </div>
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Because your providers and components are under src/providers and src/components:
import GoogleProviderWrapper from "../../../providers/GoogleProviderWrapper";

// dynamic import for the button to avoid SSR issues
const GoogleLoginButton = dynamic(
  () => import("../../../components/GoogleLoginButton"),
  { ssr: false }
);

const base = process.env.NEXT_PUBLIC_API_BASE;

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    aadharCardNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${base}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.token) localStorage.setItem("token", data.token);

      const profileRes = await fetch(`${base}/user/profile`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const profileData = await profileRes.json();
      const role = profileData.user?.role;
      if (role) localStorage.setItem("role", role);

      if (role === "admin") router.push("/election-management");
      else router.push("/voting-booth");
    } catch (err) {
      setError(err.message || "Invalid credentials");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-blue-200"
            >
              Sign in to your account
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Aadhar Card Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="text"
                  name="aadharCardNumber"
                  value={formData.aadharCardNumber}
                  onChange={handleChange}
                  required
                  className="bg-white/10 w-full pl-10 pr-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="123412341234"
                />
              </div>
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/10 w-full pl-10 pr-10 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-blue-300 hover:text-blue-200 transition-colors" />
                  ) : (
                    <FiEye className="h-5 w-5 text-blue-300 hover:text-blue-200 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <FiAlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </motion.div>
            )}

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
                "Sign In"
              )}
            </motion.button>

            <p className="text-center text-blue-200">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </motion.form>

          <div className="mt-8">
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-blue-200">
                Or continue with
              </span>
            </div>
            <div className="mt-4 flex justify-center">
              <GoogleProviderWrapper>
                <GoogleLoginButton />
              </GoogleProviderWrapper>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
