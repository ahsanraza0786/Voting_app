const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const { generateToken } = require("../jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = new User({
        name: payload.name,
        email: payload.email,
        aadharCardNumber: "",
        role: "user",
        password: "",
      });
      await user.save();
    }

    const jwtToken = generateToken({ id: user._id });
    res.status(200).json({ token: jwtToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
});

module.exports = router;
