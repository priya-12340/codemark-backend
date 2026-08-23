const express = require("express");
const { authLimiter } = require('../middleware/rateLimiter');
const router = express.Router();
const {signup, login} = require("../controllers/authController");
const authMiddleware = require('../middleware/authMiddleware');

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ message: "This is protected data", userId: req.userId });
});

module.exports = router;