"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FiCheck, FiClock, FiAlertCircle } from "react-icons/fi";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
export default function Elections() {
  const router = useRouter();
  // Remove create election state and form
  const [candidates, setCandidates] = useState([]);
  const [elections, setElections] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Auth check
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/login');
        return;
      }
      setRole(localStorage.getItem('role'));
    }
  }, [router]);

  async function handleDeleteElection(electionId) {
    if (!window.confirm('Are you sure you want to delete this election?')) return;
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    try {
      const res = await fetch(`${base}/election/${electionId}`, { method: 'DELETE', headers });
      if (!res.ok) throw new Error('Failed to delete election');
      setElections(elections.filter(e => e._id !== electionId));
      alert('Election deleted');
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  }

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
    fetch(`${base}/candidate`)
      .then(r => r.json())
      .then(data => setCandidates(data || []))
      .catch(err => {
        console.error('Failed to load candidates', err);
        setCandidates([]);
      });
    // load elections from backend
    fetch(`${base}/election`)
      .then(r => r.json())
      .then(data => setElections(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Failed to load elections', err);
        setElections([]);
      });
  }, []);

  // ...existing code...


  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Elections Hero */}
      <section className="pt-16 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Current Elections
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              View active elections and cast your vote securely
            </motion.p>
          </div>
        </div>
      </section>

      {/* Elections List */}
      <section className="py-12 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Only show elections, no create button for admin */}
          {elections.map((election) => (
            <motion.div
              key={election._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            >
              {/* Election Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">{election.title}</h2>
                  <div className="flex items-center gap-2">
                    {election.status === 'Active' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">Active</span>
                    )}
                    {election.status === 'Draft' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">Draft</span>
                    )}
                    {election.status === 'Completed' && (
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-700">Completed</span>
                    )}
                    {role === 'admin' && (
                      <button
                        className="ml-2 px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition-colors duration-200"
                        onClick={() => handleDeleteElection(election._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{election.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <FiClock className="mr-2" />
                  <span>
                    {election.startDate ? new Date(election.startDate).toLocaleDateString() : 'TBD'} - {election.endDate ? new Date(election.endDate).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
              </div>

              {/* Candidates Grid */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {election.candidates.map((candidate, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                          {candidate.imageUrl ? (
                            <Image
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                              {candidate.name?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-semibold text-gray-900">{candidate.name}</h4>
                          <p className="text-sm text-gray-600">{candidate.position}</p>
                        </div>
                      </div>
                      <p className="text-gray-600">{candidate.manifesto}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Voting Section */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiAlertCircle className="text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">You haven't voted in this election yet</span>
                  </div>
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    onClick={() => window.location.href = `/voting-booth?electionId=${election._id}`}
                  >
                    Cast Your Vote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Voting Instructions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Vote</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  1
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Review Candidates</h3>
                <p className="mt-2 text-gray-600">
                  Read through candidate profiles and their manifestos carefully
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  2
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Make Your Choice</h3>
                <p className="mt-2 text-gray-600">
                  Select your preferred candidate and confirm your selection
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  3
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Verify Your Vote</h3>
                <p className="mt-2 text-gray-600">
                  Confirm your vote and receive a verification receipt
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}