// "use client";
// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import styles from './voting-booth.css';


// export default function VotingBooth() {
//   const search = useSearchParams();
//   const router = useRouter();
//   const electionIdFromQuery = search.get('electionId');

//   const [currentElection, setCurrentElection] = useState({
//     _id: null,
//     title: '',
//     description: '',
//     endDate: '',
//     type: '',
//     candidates: []
//   });

//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [voted, setVoted] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleVote = () => {
//     setShowConfirmation(true);
//   };

//   const confirmVote = () => {
//     // Submit to backend
//     const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
//     const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;
//     const headers = { 'Content-Type': 'application/json' };
//     if (token) headers['Authorization'] = `Bearer ${token}`;

//     const payload = { electionId: currentElection._id, candidateId: selectedCandidate };
//     console.log('Submitting vote payload:', payload);

//     if (!token) {
//       alert('Please log in to vote.');
//       router.replace('/login');
//       return;
//     }

//     fetch(`${base}/vote`, {
//       method: 'POST',
//       headers,
//       body: JSON.stringify(payload)
//     })
//       .then(async res => {
//         const data = await res.json().catch(() => ({}));
//         if (!res.ok) {
//           const message = data.error || data.message || `Request failed (${res.status})`;
//           setErrorMessage(message);
//           if (res.status === 401) {
//             alert('Session expired or unauthorized. Please log in again.');
//             localStorage.removeItem('token');
//             localStorage.removeItem('role');
//             router.replace('/login');
//           } else {
//             alert('Failed to submit vote: ' + message);
//           }
//           return;
//         }
//         setVoted(true);
//       })
//       .catch(err => {
//         console.error('Vote submit failed', err);
//         alert('Vote failed: ' + err.message);
//       })
//       .finally(() => setShowConfirmation(false));
//   };

//   useEffect(() => {
//     // Require authentication
//     const t = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;
//     if (!t) {
//       router.replace('/login');
//       return;
//     }
//     if (!electionIdFromQuery) return;
//     const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';
//     fetch(`${base}/election/${electionIdFromQuery}`)
//       .then(r => r.json())
//       .then(data => {
//         if (data && data._id) {
//           // Normalize candidate ids for frontend selection
//           const candidates = (data.candidates || []).map(c => ({
//             id: c._id,
//             name: c.name,
//             party: c.party,
//             position: c.position || '',
//             manifesto: c.manifesto || ''
//           }));
//           setCurrentElection({ ...data, candidates });
//         }
//       })
//       .catch(err => console.error('Failed to fetch election', err));
//   }, [electionIdFromQuery]);

//   if (voted) {
//     return (
//       <motion.div 
//         className="success-container"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className="success-content">
//           <div className="success-icon">✓</div>
//           <h2>Thank You for Voting!</h2>
//           <p>Your vote has been successfully recorded.</p>
//           <p className="vote-id">Vote ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
//           <div className="flex flex-col gap-4 mt-6">
//             <button className="return-btn" onClick={() => window.location.href = '/voter-dashboard'}>
//               Return to Dashboard
//             </button>
//             <button className="return-btn" style={{background:'#1e40af'}} onClick={() => window.location.href = `/results?electionId=${currentElection._id}`}>View Results</button>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <div className="voting-booth-container">
//       {/* Election Info Header */}
//       <motion.div 
//         className="election-info"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h1>{currentElection.title}</h1>
//         <p className="election-description">{currentElection.description}</p>
//         <div className="election-meta">
//           <span className="type-badge">{currentElection.type}</span>
//           <span className="deadline">Voting ends: {currentElection.endDate}</span>
//         </div>
//       </motion.div>

//       {/* Voting Area */}
//       <div className="voting-area">
//         <h2>Select Your Candidate</h2>
        
//         <div className="candidates-grid">
//           {currentElection.candidates.map((candidate) => (
//             <motion.div 
//               key={candidate.id}
//               className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
//               onClick={() => setSelectedCandidate(candidate.id)}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <div className="candidate-image">
//                 <div className="image-placeholder">
//                   {candidate.name.charAt(0)}
//                 </div>
//               </div>
//               <div className="candidate-info">
//                 <h3>{candidate.name}</h3>
//                 <span className="party-badge">{candidate.party}</span>
//                 <p className="position">{candidate.position}</p>
//                 <p className="manifesto">{candidate.manifesto}</p>
//               </div>
//               <div className="selection-indicator">
//                 {selectedCandidate === candidate.id && <span className="checkmark">✓</span>}
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="voting-actions">
//           <button 
//             className="vote-button"
//             disabled={!selectedCandidate}
//             onClick={handleVote}
//           >
//             Submit Vote
//           </button>
//           <button 
//             className="vote-button mt-4" 
//             style={{background:'#1e40af'}}
//             onClick={() => window.location.href = `/voting-booth/results?electionId=${currentElection._id}`}
//           >
//             View Results
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       {showConfirmation && (
//         <div className="modal-backdrop">
//           <motion.div 
//             className="confirmation-modal"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//           >
//             <h2>Confirm Your Vote</h2>
//             <p>You are voting for:</p>
//             <div className="selected-candidate">
//               <h3>
//                 {currentElection.candidates.find(c => c.id === selectedCandidate)?.name}
//               </h3>
//               <p>
//                 {currentElection.candidates.find(c => c.id === selectedCandidate)?.party}
//               </p>
//             </div>
//             <p className="warning">
//               Note: This action cannot be undone. Your vote is final once submitted.
//             </p>
//             <div className="modal-actions">
//               <button 
//                 className="cancel-btn"
//                 onClick={() => setShowConfirmation(false)}
//               >
//                 Go Back
//               </button>
//               <button 
//                 className="confirm-btn"
//                 onClick={confirmVote}
//               >
//                 Confirm Vote
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// export const dynamic = 'force-dynamic';