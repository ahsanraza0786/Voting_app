'use client';
import { useState, useEffect } from 'react';
import styles from './voter-dashboard.css';
import { motion } from 'framer-motion';
import Image from 'next/image';

const staggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function VoterDashboard() {
  const [voter, setVoter] = useState({
    name: "John Doe",
    voterId: "VT123456",
    registrationDate: "2025-01-15",
    district: "District 7"
  });

  const [activeElections, setActiveElections] = useState([
    {
      id: 1,
      title: "City Council Election 2025",
      date: "2025-10-15",
      status: "Active",
      remainingTime: "19 days"
    },
    {
      id: 2,
      title: "School Board Election",
      date: "2025-11-05",
      status: "Upcoming",
      remainingTime: "40 days"
    }
  ]);

  useEffect(() => {
    // Fetch elections from backend
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    fetch(`${base}/election`)
      .then(r => r.json())
      .then(data => {
        // Filter to active or upcoming
        const list = (data || []).map(e => ({
          id: e._id,
          title: e.title,
          date: e.endDate ? new Date(e.endDate).toLocaleDateString() : '',
          status: e.status || 'Draft',
          remainingTime: e.endDate ? Math.max(0, Math.ceil((new Date(e.endDate) - new Date())/(1000*60*60*24))) + ' days' : ''
        }));
        setActiveElections(list);
      })
      .catch(err => console.error('Failed to load elections', err));
  }, []);

  const [votingHistory, setVotingHistory] = useState([
    {
      id: 1,
      election: "State Governor Election",
      date: "2025-08-15",
      status: "Completed"
    },
    {
      id: 2,
      election: "Local Referendum",
      date: "2025-07-01",
      status: "Completed"
    }
  ]);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <h1>Voter Dashboard</h1>
          <p className="welcome-text">Welcome back, {voter.name}</p>
        </div>
        <div className="profile-summary">
          <div className="voter-id-card">
            <div className="card-header">
              <Image 
                src="/vercel.svg" 
                alt="Voter ID" 
                width={40} 
                height={40}
              />
              <span>Voter ID Card</span>
            </div>
            <div className="card-details">
              <p><strong>ID:</strong> {voter.voterId}</p>
              <p><strong>District:</strong> {voter.district}</p>
              <p><strong>Since:</strong> {voter.registrationDate}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Active Elections Section */}
        <motion.section 
          className="dashboard-section active-elections"
          variants={staggerVariants}
          initial="hidden"
          animate="show"
        >
          <h2>Active Elections</h2>
          <div className="elections-list">
            {activeElections.map((election) => (
              <motion.div 
                key={election.id} 
                className="election-card"
                variants={itemVariants}
              >
                <div className="election-info">
                  <h3>{election.title}</h3>
                  <p className="election-date">{election.date}</p>
                  <span className={`status-badge ${election.status.toLowerCase()}`}>
                    {election.status}
                  </span>
                </div>
                <div className="election-actions">
                  <span className="time-remaining">{election.remainingTime}</span>
                  <button className="vote-btn" onClick={() => window.location.href = `/voting-booth?electionId=${election.id}`}>
                    {election.status === 'Active' ? 'Vote Now' : 'View Details'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Voting History Section */}
        <motion.section 
          className="dashboard-section voting-history"
          variants={staggerVariants}
          initial="hidden"
          animate="show"
        >
          <h2>Voting History</h2>
          <div className="history-list">
            {votingHistory.map((vote) => (
              <motion.div 
                key={vote.id} 
                className="history-card"
                variants={itemVariants}
              >
                <div className="history-info">
                  <h3>{vote.election}</h3>
                  <p className="vote-date">{vote.date}</p>
                </div>
                <span className="completed-badge">✓ {vote.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Profile Settings Section */}
        <motion.section 
          className="dashboard-section profile-settings"
          variants={staggerVariants}
          initial="hidden"
          animate="show"
        >
          <h2>Profile Settings</h2>
          <div className="settings-grid">
            <motion.div className="settings-card" variants={itemVariants}>
              <div className="settings-icon">👤</div>
              <h3>Personal Information</h3>
              <p>Update your personal details and contact information</p>
              <button className="settings-btn">Edit Profile</button>
            </motion.div>
            <motion.div className="settings-card" variants={itemVariants}>
              <div className="settings-icon">🔒</div>
              <h3>Security Settings</h3>
              <p>Manage your password and security preferences</p>
              <button className="settings-btn">Security Settings</button>
            </motion.div>
            <motion.div className="settings-card" variants={itemVariants}>
              <div className="settings-icon">📱</div>
              <h3>Notification Preferences</h3>
              <p>Control how you receive updates and alerts</p>
              <button className="settings-btn">Manage Notifications</button>
            </motion.div>
            <motion.div className="settings-card" variants={itemVariants}>
              <div className="settings-icon">📝</div>
              <h3>Voting Preferences</h3>
              <p>Set your default voting method and preferences</p>
              <button className="settings-btn">Update Preferences</button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}