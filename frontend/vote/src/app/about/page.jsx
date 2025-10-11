"use client";


import React, { useState } from 'react';
import { Shield, Users, BarChart3, Lock, CheckCircle, Zap, Menu, X, Vote, Home, Info, Mail } from 'lucide-react';


import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const features = [
        {
            icon: Shield,
            title: "Secure & Transparent",
            description: "Built with encryption and authentication to ensure every vote counts and remains confidential."
        },
        {
            icon: Users,
            title: "User-Friendly",
            description: "Intuitive interface designed for both administrators and voters, accessible from any device."
        },
        {
            icon: BarChart3,
            title: "Real-Time Results",
            description: "Watch election results update live with beautiful graphical and statistical representations."
        },
        {
            icon: Lock,
            title: "One Vote Per User",
            description: "Advanced enforcement ensures each voter can cast only one vote per election, maintaining integrity."
        },
        {
            icon: CheckCircle,
            title: "Complete Management",
            description: "Comprehensive admin tools for creating elections, managing candidates, and exporting results."
        },
        {
            icon: Zap,
            title: "Fast & Efficient",
            description: "Lightning-fast performance with instant vote processing and automated result calculation."
        }
    ];

    const techStack = [
        { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS"] },
        { category: "Backend", items: ["Node.js", "Express.js"] },
        { category: "Database", items: ["MongoDB"] },
        { category: "Security", items: ["JWT", "bcrypt"] }
    ];

    const navLinks = [
        { name: "Home", href: "/", icon: Home },
        { name: "About", href: "/about", icon: Info },
        { name: "Elections", href: "/elections", icon: Vote },
        { name: "Contact", href: "/contact", icon: Mail }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/95 to-slate-900">
            {/* Navbar */}

            <Navbar />


            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Voting Management System
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
                            Revolutionizing democracy through secure, transparent, and efficient digital voting
                        </p>
                    </div>
                </div>
            </div>

            {/* Problem & Solution Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-blue-500/30 shadow-2xl shadow-blue-500/10">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <div className="inline-block px-4 py-1 bg-red-500/20 border border-red-500/50 rounded-full text-red-300 text-sm font-semibold mb-4">
                                The Challenge
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Traditional Voting Problems</h2>
                            <p className="text-blue-100 leading-relaxed">
                                Traditional voting systems struggle with managing voter records, ensuring fair elections,
                                and delivering quick results. Manual processes are time-consuming, error-prone, and lack
                                the transparency modern organizations demand.
                            </p>
                        </div>
                        <div>
                            <div className="inline-block px-4 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 text-sm font-semibold mb-4">
                                Our Solution
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Digital Innovation</h2>
                            <p className="text-blue-100 leading-relaxed">
                                A secure, user-friendly digital platform that enables real-time voting, automatic result
                                calculation, and robust admin controls. We bring transparency, efficiency, and trust to
                                every election.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-sm font-semibold mb-4">
                        Features
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                        Powerful Capabilities
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:bg-slate-800/60 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20"
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-blue-200 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold mb-4">
                        Technology
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                        Built With Modern Stack
                    </h2>
                </div>
                <div className="grid md:grid-cols-4 gap-6">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                        >
                            <h3 className="text-lg font-bold text-white mb-4 text-center">{tech.category}</h3>
                            <div className="space-y-2">
                                {tech.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-slate-800/50 rounded-lg px-4 py-2 text-center text-blue-100 text-sm hover:bg-slate-800/70 transition-colors"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Use Cases Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-blue-400/30">
                    <div className="text-center mb-8">
                        <div className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-300 text-sm font-semibold mb-4">
                            Use Cases
                        </div>
                        <h2 className="text-4xl font-bold text-white">
                            Perfect For Every Scenario
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                            <div className="text-4xl mb-3">🎓</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Educational Institutions</h3>
                            <p className="text-blue-200 text-sm">School and college elections made simple and secure</p>
                        </div>
                        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                            <div className="text-4xl mb-3">🏢</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Organizations</h3>
                            <p className="text-blue-200 text-sm">Club votes and internal polls conducted efficiently</p>
                        </div>
                        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                            <div className="text-4xl mb-3">📊</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Small-Scale Elections</h3>
                            <p className="text-blue-200 text-sm">Any voting scenario requiring transparency and speed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
                <div className="text-center mb-12">
                    <div className="inline-block px-4 py-1 bg-indigo-500/20 border border-indigo-500/50 rounded-full text-indigo-300 text-sm font-semibold mb-4">
                        Team
                    </div>
                    <h2 className="text-4xl font-bold text-white">
                        Development Team
                    </h2>
                </div>
                <div className="flex justify-center">
                    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/30 max-w-md hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/50">
                                <span className="text-3xl font-bold text-white">AR</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ahsan Raza</h3>
                            <p className="text-blue-200 mb-4">Lead Developer</p>
                            <div className="flex justify-center space-x-2">
                                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-blue-300 text-xs">Full Stack</span>
                                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-xs">React</span>
                                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 text-xs">Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
}