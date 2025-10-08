"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function VotingResults() {
  const search = useSearchParams();
  const electionId = search.get("electionId");
  const [results, setResults] = useState([]);
  const [election, setElection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!electionId) return;
    const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8080";
    setLoading(true);
    Promise.all([
      fetch(`${base}/election/${electionId}`).then(r => r.json()),
      fetch(`${base}/vote/results/${electionId}`).then(r => r.json())
    ])
      .then(([electionData, resultsData]) => {
        setElection(electionData);
        setResults(resultsData.results || []);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load results");
        setLoading(false);
      });
  }, [electionId]);

  if (!electionId) return <div className="p-8 text-center">No election selected.</div>;
  if (loading) return <div className="p-8 text-center">Loading results...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2 text-center">Election Results</h1>
        <h2 className="text-xl font-semibold mb-6 text-center">{election?.title}</h2>
        <div className="bg-white rounded-lg shadow p-6">
          {results.length === 0 ? (
            <div className="text-center text-gray-500">No votes have been cast yet.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">Candidate</th>
                  <th className="py-2 px-4">Party</th>
                  <th className="py-2 px-4">Votes</th>
                </tr>
              </thead>
              <tbody>
                {results.map(({ candidate, count }) => (
                  <tr key={candidate._id} className="border-t">
                    <td className="py-2 px-4 font-medium">{candidate.name}</td>
                    <td className="py-2 px-4">{candidate.party}</td>
                    <td className="py-2 px-4 font-bold text-blue-700">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
