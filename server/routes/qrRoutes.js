const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const crypto = require("crypto");

// STORE ACTIVE QR (temporary memory for now)
let activeQR = null;

/**
 * GENERATE QR (Teacher)
 */
router.post("/generate", async (req, res) => {
  try {
    const classId = req.body.classId;

    if (!classId) {
      return res.status(400).json({ msg: "classId required" });
    }

    // create unique token
    const token = crypto.randomBytes(16).toString("hex");

    // QR payload
    const qrData = JSON.stringify({
      classId,
      token,
      createdAt: Date.now(),
    });

    // generate QR image
    const qrImage = await QRCode.toDataURL(qrData);

    // store active QR (temporary)
    activeQR = {
      classId,
      token,
      expiresAt: Date.now() + 60 * 1000, // 1 minute validity
    };

    res.json({
      qrImage,
      token,
      message: "QR generated successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

/**
 * VERIFY QR (Student Scan)
 */
router.post("/verify", (req, res) => {
  const { classId, token, userId } = req.body;

  if (!activeQR) {
    return res.status(400).json({ msg: "No active QR" });
  }

  // check expiry
  if (Date.now() > activeQR.expiresAt) {
    return res.status(400).json({ msg: "QR expired" });
  }

  // validate
  if (
    activeQR.classId === classId &&
    activeQR.token === token
  ) {
    return res.json({
      msg: "Attendance marked successfully ✅",
      userId,
      classId,
    });
  }

  res.status(400).json({ msg: "Invalid QR" });
});

module.exports = router;