// routes/protectedRoute.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.get("/protected", protect, (req, res) => {
  res.status(200).json({ message: "You have accessed a protected route", user: req.user });
});

module.exports = router;
