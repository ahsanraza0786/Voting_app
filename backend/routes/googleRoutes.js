const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const { generateToken } = require("../jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user exists in DB
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        password: "", // optional, since login is via Google
      });
      await user.save();
    }

    // Generate token
    const token = generateToken({ id: user._id });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Google login failed" });
  }
});

module.exports = router;
