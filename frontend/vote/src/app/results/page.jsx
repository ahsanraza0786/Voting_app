"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FiBarChart2, FiRefreshCcw, FiSearch, FiChevronRight } from "react-icons/fi";

export default function ResultsPage() {
  const [elections, setElections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [query, setQuery] = useState("");

  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`${base}/election`).then((r) => r.json()).catch(() => []),
    ])
      .then(([list]) => {
        const safe = Array.isArray(list) ? list : [];
        setElections(safe);
        if (safe.length > 0) setSelectedId(safe[0]._id);
      })
      .catch(() => setElections([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = localStorage.getItem('role');
      setIsAdmin(role === 'admin');
    }
  }, []);

  const selectedElection = useMemo(
    () => elections.find((e) => e._id === selectedId) || null,
    [elections, selectedId]
  );

  const filteredElections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return elections;
    return elections.filter((e) =>
      [e.title, e.description]
        .filter(Boolean)
        .some((t) => t.toLowerCase().includes(q))
    );
  }, [elections, query]);

  const loadResults = async (electionId) => {
    if (!electionId) return;
    setError("");
    setLoading(true);
    try {
      const data = await fetch(`${base}/vote/results/${electionId}`).then((r) => r.json());
      setResults(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      setError("Failed to load results");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedId) loadResults(selectedId);
  }, [selectedId]);

  const totalVotes = useMemo(
    () => results.reduce((sum, r) => sum + (r.count || 0), 0),
    [results]
  );

  const status = selectedElection?.status || 'Draft';
  const canView = status === 'Completed' || (status === 'Active' && isAdmin) || (status === 'Draft' && isAdmin);
  const winners = useMemo(() => {
    if (!results || results.length === 0) return [];
    const max = Math.max(...results.map(r => r.count || 0));
    return results.filter(r => (r.count || 0) === max);
  }, [results]);

  return (
    <main className="min-h-screen bg-gray-50 subpixel-antialiased text-gray-900">
      <Navbar />

      <section className="pt-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
              >
                Election Results
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-blue-100/90 text-lg max-w-2xl"
              >
                View live tallies, compare candidates, and explore outcomes.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => loadResults(selectedId)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-medium shadow hover:shadow-md transition"
              >
                <FiRefreshCcw className="w-4 h-4" /> Refresh
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="-mt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Elections list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-4"
            >
              <div className="flex items-center gap-2 mb-3 text-gray-800">
                <FiSearch className="w-5 h-5" />
                <span className="font-semibold">Find an election</span>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or description"
                className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="max-h-[380px] overflow-auto pr-1 space-y-2">
                {filteredElections.map((e) => (
                  <motion.button
                    key={e._id}
                    onClick={() => setSelectedId(e._id)}
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-3 rounded-lg border transition flex items-center justify-between hover:shadow-sm ${
                      selectedId === e._id
                        ? "bg-blue-50 border-blue-300"
                        : "bg-white hover:bg-gray-50 border-gray-300"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-gray-900">{e.title}</div>
                      <div className="text-xs text-gray-600">
                        {e.status} • {e.type} • {e.totalVotes || 0} votes
                      </div>
                    </div>
                    <FiChevronRight className={`w-5 h-5 ${selectedId === e._id ? "text-blue-600" : "text-gray-500"}`} />
                  </motion.button>
                ))}
                {filteredElections.length === 0 && (
                  <div className="text-sm text-gray-600">No elections found.</div>
                )}
              </div>
            </motion.div>

            {/* Results panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-xl shadow-lg ring-1 ring-black/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <FiBarChart2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{selectedElection?.title || "Select an election"}</div>
                      <div className="text-xs text-gray-600">Total votes: {totalVotes}</div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 mb-3">{error}</div>
                )}

                {/* Access control notice */}
                {!canView ? (
                  <div className="py-12 text-center">
                    <div className="inline-block px-4 py-2 rounded-lg bg-yellow-50 text-yellow-800 border border-yellow-200">
                      Results are visible to admins during active elections. Please check back after completion.
                    </div>
                  </div>
                ) : loading ? (
                  <div className="py-2 space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                          <div className="h-5 w-10 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
                          <div className="h-3.5 bg-gray-200 w-1/2 animate-pulse" />
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                          <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center text-gray-600">No votes yet.</div>
                ) : (
                  <div className="space-y-4">
                    {status === 'Completed' && winners.length > 0 && (
                      <div className="p-4 rounded-xl border border-green-200 bg-green-50">
                        <div className="text-sm text-green-800 font-semibold mb-1">Winner{winners.length > 1 ? 's' : ''}</div>
                        <div className="flex flex-wrap gap-3">
                          {winners.map((w, i) => (
                            <div key={w.candidate._id} className="px-3 py-1 rounded-lg bg-white border border-green-200 text-green-800 shadow-sm">
                              {w.candidate.name} ({w.count} votes)
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {results.map(({ candidate, count }, idx) => {
                      const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                      return (
                        <motion.div
                          key={candidate._id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                          className="p-4 rounded-xl border border-gray-300 hover:shadow-md transition group"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-semibold text-gray-900">{candidate.name}</div>
                              <div className="text-xs text-gray-600">{candidate.party}</div>
                            </div>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              {pct}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6 }}
                              className="h-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                            />
                          </div>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-gray-800 font-semibold">
                              <CountUp end={count} duration={0.6} /> votes
                            </span>
                            <span className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">{new Intl.NumberFormat().format(count)} total</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


