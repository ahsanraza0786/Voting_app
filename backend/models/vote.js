const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  election: { type: mongoose.Schema.Types.ObjectId, ref: 'Election', required: true },
  voter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
  votedAt: { type: Date, default: Date.now },
  voteId: { type: String, unique: true },
  verified: { type: Boolean, default: false }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
