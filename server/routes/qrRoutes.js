const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const crypto = require("crypto");

const Attendance = require("../models/Attendance");

// Store active QR tokens temporarily
let activeQR = {};

/**
 * GENERATE QR (Teacher)
 */
router.post("/generate", async (req, res) => {

  try {

    const { classId } = req.body;

    if (!classId) {
      return res.status(400).json({
        msg: "classId required",
      });
    }

    // Create random token
    const token = crypto.randomBytes(16).toString("hex");

    // Store token in memory
    activeQR[classId] = token;

    // QR payload
    const qrData = JSON.stringify({
      classId,
      token,
      createdAt: Date.now(),
    });

    // Generate QR image
    const qrImage = await QRCode.toDataURL(qrData);

    res.json({
      qrImage,
      token,
      msg: "QR generated successfully ✅",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});

/**
 * VERIFY QR (Student Scan)
 */
router.post("/verify", async (req, res) => {

  try {

    const {
  classId,
  token,
  userId,
  studentName,
} = req.body;

    console.log("Incoming:");
    console.log(classId);
    console.log(token);

    console.log("Stored:");
    console.log(activeQR);

    // Check QR exists
    if (!activeQR[classId]) {
      return res.status(400).json({
        msg: "QR expired",
      });
    }

    // Verify token
    if (activeQR[classId] !== token) {
      return res.status(400).json({
        msg: "Invalid QR",
      });
    }

    // Prevent duplicate attendance
    const alreadyMarked = await Attendance.findOne({
      studentId: userId,
      classId,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        msg: "Attendance already marked",
      });
    }

    // Save attendance
   const attendance = new Attendance({
  studentId: userId,
  studentName,
  classId,
});
    await attendance.save();

    res.json({
      msg: "Attendance marked successfully ✅",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});

router.get("/attendance", async (req, res) => {

  try {

    const records = await Attendance.find().sort({
      date: -1,
    });

    res.json(records);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});

module.exports = router;