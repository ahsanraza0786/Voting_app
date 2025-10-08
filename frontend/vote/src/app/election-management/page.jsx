"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FiEdit, FiUserPlus, FiBarChart2, FiDownload } from "react-icons/fi";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ElectionManagement() {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const today = new Date();
  const toISODate = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  const defaultStart = toISODate(today);
  const defaultEnd = toISODate(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
  const [form, setForm] = useState({ title: '', description: '', startDate: defaultStart, endDate: defaultEnd, type: 'Local', candidateIds: [] });
  const [activateNow, setActivateNow] = useState(true);

  useEffect(() => {
    // Auth check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
    }
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    fetch(`${base}/candidate`)
      .then(r => r.json())
      .then(data => setCandidates(data))
      .catch(() => setCandidates([]));
  }, [router]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${base}/election`, { method: 'POST', headers, body: JSON.stringify(form) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert('Create failed: ' + (err.error || err.message || `HTTP ${res.status}`));
      return;
    }
    const created = await res.json();

    if (activateNow && created && created._id) {
      try {
        const actRes = await fetch(`${base}/election/${created._id}/activate`, { method: 'POST', headers });
        if (!actRes.ok) {
          const ejson = await actRes.json().catch(() => ({}));
          alert('Created but activation failed: ' + (ejson.error || ejson.message || `HTTP ${actRes.status}`));
        } else {
          alert('Election created and activated');
        }
      } catch (err) {
        alert('Created but activation error: ' + err.message);
      }
    } else {
      alert('Election created');
    }
      setShowCreate(false);
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const res = await fetch(`${base}/candidate`, { method: 'POST', headers, body: formData });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert('Add candidate failed: ' + (data.error || data.message || `HTTP ${res.status}`));
        return;
      }
      alert('Candidate added');
      setShowAddCandidate(false);
      // refresh list
      fetch(`${base}/candidate`).then(r => r.json()).then(d => setCandidates(d || [])).catch(() => {});
    } catch (err) {
      alert('Add candidate error: ' + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Admin Dashboard Hero */}
      <section className="pt-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Election Management Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Manage elections, candidates, and monitor results in real-time
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group bg-white p-6 rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FiEdit className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Create Election</h3>
              </div>
              <p className="text-gray-600">Set up a new election with customizable parameters</p>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowCreate(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group bg-white p-6 rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                  <FiUserPlus className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Add Candidates</h3>
              </div>
              <p className="text-gray-600">Manage candidate profiles and information</p>
              <div className="mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowAddCandidate(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add Candidate
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group bg-white p-6 rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <FiBarChart2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">View Results</h3>
              </div>
              <p className="text-gray-600">Monitor real-time election results and analytics</p>
              <div className="mt-4">
                <motion.a
                  href="/results"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  View Results
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group bg-white p-6 rounded-xl shadow-lg ring-1 ring-black/5 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <FiDownload className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Export Data</h3>
              </div>
              <p className="text-gray-600">Download results in CSV or PDF format</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Active Elections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Elections</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Election Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Student Council Election 2025</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">Sep 25, 2025</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">Sep 30, 2025</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Election Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">Total Registered Voters</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">856</div>
              <div className="text-sm text-gray-600">Votes Cast</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">69.4%</div>
              <div className="text-sm text-gray-600">Voter Turnout</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-gray-600">Active Elections</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showCreate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden subpixel-antialiased text-gray-900">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Create Election</h2>
                <p className="text-white/80 text-sm">Define details and select candidates</p>
              </div>
              <form onSubmit={handleCreate} className="px-6 py-5">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Title</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g., Student Council Election 2025"
                    required
                  />
              </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Description</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900 placeholder-gray-500"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the purpose, rules, or any details for voters"
                    required
                  />
              </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                      value={form.startDate}
                      onChange={e => setForm({ ...form, startDate: e.target.value })}
                      required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                      value={form.endDate}
                      onChange={e => setForm({ ...form, endDate: e.target.value })}
                      required
                    />
                </div>
              </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Type</label>
                  <select
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                  >
                  <option>Local</option>
                  <option>State</option>
                  <option>Federal</option>
                </select>
              </div>
                <div className="mb-4 flex items-center gap-3">
                  <input
                    id="activateNow"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={activateNow}
                    onChange={() => setActivateNow(!activateNow)}
                  />
                  <label htmlFor="activateNow" className="text-sm font-medium text-gray-800">Activate immediately</label>
                </div>
              <div className="mb-2">
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Candidates</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-auto pr-1">
                  {candidates.map(c => (
                      <label
                        key={c._id}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={form.candidateIds.includes(c._id)}
                          onChange={() => {
                            const ids = form.candidateIds.includes(c._id)
                              ? form.candidateIds.filter(x => x !== c._id)
                              : [...form.candidateIds, c._id];
                            setForm({ ...form, candidateIds: ids });
                          }}
                        />
                        <div className="leading-tight">
                          <div className="font-medium text-gray-900">{c.name}</div>
                          <div className="text-sm text-gray-600">{c.party}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    onClick={() => setShowCreate(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Election
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {showAddCandidate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden subpixel-antialiased text-gray-900">
              <div className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600">
                <h2 className="text-lg sm:text-xl font-semibold text-white">Add Candidate</h2>
                <p className="text-white/80 text-sm">Provide candidate details below</p>
              </div>
              <form onSubmit={handleAddCandidate} className="px-6 py-5" encType="multipart/form-data">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Full Name</label>
                  <input name="name" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 placeholder-gray-500" placeholder="e.g., Alex Johnson" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Candidate Image</label>
                  <input name="image" type="file" accept="image/*" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Party</label>
                  <input name="party" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 placeholder-gray-500" placeholder="e.g., Unity Party" required />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-800 mb-1">Age</label>
                  <input name="age" type="number" min="18" className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-gray-900 placeholder-gray-500" placeholder="e.g., 35" required />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" onClick={() => setShowAddCandidate(false)}>Cancel</motion.button>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Add</motion.button>
              </div>
            </form>
          </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}