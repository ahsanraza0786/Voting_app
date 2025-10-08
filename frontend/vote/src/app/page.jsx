"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
