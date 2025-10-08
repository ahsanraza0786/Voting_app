const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, enum: ['Local', 'State', 'Federal'], default: 'Local' },
  status: { type: String, enum: ['Draft', 'Active', 'Completed'], default: 'Draft' },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    }
  ],
  eligibilityCriteria: [String],
  totalVoters: { type: Number, default: 0 },
  totalVotes: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Election = mongoose.model('Election', electionSchema);
module.exports = Election;
