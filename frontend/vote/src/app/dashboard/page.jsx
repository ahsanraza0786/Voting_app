"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiUsers, FiPieChart, FiRefreshCcw } from 'react-icons/fi';
import './dashboard.css';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [voteCounts, setVoteCounts] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      // Fetch profile
      const pRes = await fetch('http://localhost:8080/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!pRes.ok) throw new Error('Failed to fetch profile');
      const pJson = await pRes.json();
      setProfile(pJson.user || pJson);

      // Fetch candidates
      const cRes = await fetch('http://localhost:8080/candidate');
      if (cRes.ok) {
        const cJson = await cRes.json();
        setCandidates(cJson || []);
      }

      // Fetch vote counts
      const vRes = await fetch('http://localhost:8080/candidate/vote/count');
      if (vRes.ok) {
        const vJson = await vRes.json();
        setVoteCounts(vJson || []);
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="dashboard-root">
        <motion.div className="dashboard-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FiRefreshCcw className="spin" />
          <p>Loading dashboard…</p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-root">
        <div className="dashboard-empty">
          <p>Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="brand-title">Welcome, {profile.name || 'User'}</motion.h1>
          <p className="brand-sub">Secure Voting Platform — Dashboard</p>
        </div>

        <div className="dashboard-actions">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="action-btn" onClick={fetchData}>
            <FiRefreshCcw /> Refresh
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="action-btn primary" onClick={handleLogout}>
            <FiLogOut /> Logout
          </motion.button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="profile-card">
          <motion.div whileHover={{ scale: 1.02 }} className="profile-inner">
            <div className="profile-avatar">
              <FiUser className="avatar-icon" />
            </div>
            <div className="profile-info">
              <h2>{profile.name}</h2>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Aadhar:</strong> {String(profile.aadharCardNumber || '').padStart(12, '*')}</p>
              <p><strong>Voted:</strong> {profile.isVoted ? 'Yes' : 'No'}</p>
            </div>
          </motion.div>
        </section>

        <section className="stats-grid">
          <motion.div whileHover={{ scale: 1.03 }} className="stat-card">
            <div className="stat-icon"><FiUsers /></div>
            <div>
              <div className="stat-value">{candidates.length}</div>
              <div className="stat-label">Candidates</div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="stat-card">
            <div className="stat-icon"><FiPieChart /></div>
            <div>
              <div className="stat-value">{voteCounts.reduce((s, r) => s + (r.count || 0), 0)}</div>
              <div className="stat-label">Total Votes</div>
            </div>
          </motion.div>
        </section>

        <section className="candidates-list">
          <h3>Candidates</h3>
          <div className="candidates-grid">
            {candidates.length === 0 && <p className="muted">No candidates available</p>}
            {candidates.map((c, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="candidate-card">
                <div className="candidate-name">{c.name}</div>
                <div className="candidate-party">{c.party}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
