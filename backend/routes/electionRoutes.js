
const express = require('express');
const router = express.Router();
const Election = require('../models/election');
const Candidate = require('../models/candidate');
const User = require('../models/user');
const { jwtAuthMiddleware, adminAuthMiddleware } = require('../jwt');

// Admin delete election
router.delete('/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const deleted = await Election.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Election not found' });
    res.json({ message: 'Election deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin creates a new election
router.post('/', adminAuthMiddleware, async (req, res) => {
  try {
    const { title, description, startDate, endDate, type, candidateIds = [], eligibilityCriteria = [] } = req.body;

    if (!title || !startDate || !endDate) return res.status(400).json({ error: 'Missing required fields' });

    const election = new Election({
      title,
      description,
      startDate,
      endDate,
      type,
      candidates: candidateIds,
      eligibilityCriteria,
      createdBy: req.user.id
    });

    const saved = await election.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all elections (public)
router.get('/', async (req, res) => {
  try {
    const elections = await Election.find().populate('candidates').lean();
    res.json(elections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get election by id
router.get('/:id', async (req, res) => {
  try {
    const election = await Election.findById(req.params.id).populate('candidates').lean();
    if (!election) return res.status(404).json({ error: 'Election not found' });
    res.json(election);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin update election
router.put('/:id', adminAuthMiddleware, async (req, res) => {
  try {
    const updated = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Election not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin activate an election (set status Active)
router.post('/:id/activate', adminAuthMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    election.status = 'Active';
    await election.save();
    res.json({ message: 'Election activated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin end an election (set status Completed)
router.post('/:id/end', adminAuthMiddleware, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    election.status = 'Completed';
    await election.save();
    res.json({ message: 'Election ended' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
