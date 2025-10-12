"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiLoader } from "react-icons/fi";
import Link from "next/link";
import dynamic from "next/dynamic";
import GoogleProviderWrapper from "@/app/providers/googleProvider";

const GoogleLoginButton = dynamic(
  () => import("@/components/GoogleLoginButton"),
  { ssr: false }
);

export default function Login() {
  const [formData, setFormData] = useState({ aadharCardNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      alert("Logged in successfully!");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    setGoogleUser(credentialResponse);
    alert("Google login successful! Check console for details.");
  };

  const handleGoogleError = () => {
    alert("Google login failed!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 relative">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-200">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">Aadhar Card Number</label>
              <input
                type="text"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                required
                className="bg-white/10 w-full pl-3 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123412341234"
              />
            </div>

            <div>
              <label className="block text-blue-200 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/10 w-full pl-3 pr-10 py-2 rounded-lg border border-white/20 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5 text-blue-300" /> : <FiEye className="h-5 w-5 text-blue-300" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <FiAlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium"
            >
              {loading ? <FiLoader className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>

            <p className="text-center text-blue-200">
              Don't have an account?{" "}
              <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </form>

          <div className="mt-8 flex flex-col items-center">
            <p className="text-blue-200 mb-2">Or continue with</p>
            <GoogleProviderWrapper>
              <GoogleLoginButton onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </GoogleProviderWrapper>
          </div>

          {googleUser && (
            <div className="mt-4 p-4 bg-blue-900/20 rounded-lg text-white">
              <p>Google User Info:</p>
              <pre>{JSON.stringify(googleUser, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
