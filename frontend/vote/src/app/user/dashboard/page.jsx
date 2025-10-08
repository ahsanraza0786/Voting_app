// User dashboard page (protected)
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiUsers, FiPieChart, FiRefreshCcw } from 'react-icons/fi';
import '../../dashboard/dashboard.css';


export default function Dashboard() {
  // You can add your previous authentication logic here if needed
  return (
    <div>
      {/* User dashboard UI here */}
      <h1>User Dashboard</h1>
    </div>
  );
}
