const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({
      msg: "Registration successful ✅",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid password",
      });
    }

    const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.json({
  msg: "Login successful ✅",
  token,
  user,
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});

module.exports = router;