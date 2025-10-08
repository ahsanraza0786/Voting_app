const express = require('express');
const router = express.Router();
const Election = require('../models/election');
const Candidate = require('../models/candidate');
const Vote = require('../models/vote');
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../jwt');
const crypto = require('crypto');

// Cast a vote
router.post('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const { electionId, candidateId } = req.body;
    const userId = req.user.id;

    if (!electionId || !candidateId) return res.status(400).json({ error: 'Missing electionId or candidateId' });

    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    // Ensure election is active and within date range
    const now = new Date();
    if (election.status !== 'Active' || now < new Date(election.startDate) || now > new Date(election.endDate)) {
      return res.status(400).json({ error: 'Election is not active' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role === 'admin') return res.status(403).json({ error: 'Admins cannot vote' });

    // Check if the user already has a vote in this election
    const existingVote = await Vote.findOne({ election: electionId, voter: userId });
    if (existingVote) return res.status(400).json({ error: 'User has already voted in this election' });

    // Ensure candidate is part of the election
    if (!election.candidates || !election.candidates.map(c => c.toString()).includes(candidateId.toString())) {
      return res.status(400).json({ error: 'Candidate does not belong to this election' });
    }

    // Record vote
    const voteId = crypto.randomBytes(6).toString('hex').toUpperCase();
    const vote = new Vote({ election: electionId, voter: userId, candidate: candidateId, voteId });
    await vote.save();

    // Increment candidate voteCount and push record
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    candidate.votes.push({ user: userId });
    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save();

    // Update election totals
    election.totalVotes = (election.totalVotes || 0) + 1;
    await election.save();

    res.json({ message: 'Vote recorded', voteId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get election results
router.get('/results/:electionId', async (req, res) => {
  try {
    const { electionId } = req.params;
    const votes = await Vote.find({ election: electionId }).populate('candidate', 'name party').lean();

    // Aggregate counts by candidate
    const results = {};
    votes.forEach(v => {
      const cid = v.candidate._id.toString();
      results[cid] = results[cid] || { candidate: v.candidate, count: 0 };
      results[cid].count++;
    });

    const formatted = Object.values(results).sort((a,b) => b.count - a.count);
    res.json({ results: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get voter history
router.get('/history/:voterId', jwtAuthMiddleware, async (req, res) => {
  try {
    const { voterId } = req.params;
    // Allow user to fetch own history or admins to fetch any
    if (req.user.id !== voterId) {
      const user = await User.findById(req.user.id);
      if (user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    }

    const votes = await Vote.find({ voter: voterId }).populate('election candidate').lean();
    res.json({ votes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
