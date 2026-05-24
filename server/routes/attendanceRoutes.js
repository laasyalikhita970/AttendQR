const express = require("express");

const router = express.Router();

const Attendance = require("../models/Attendance");

router.get("/", async (req, res) => {

  try {

    const records = await Attendance.find().sort({
      createdAt: -1,
    });

    res.json(records);

  } catch (error) {

    res.status(500).json({
      msg: error.message,
    });

  }

});

module.exports = router;