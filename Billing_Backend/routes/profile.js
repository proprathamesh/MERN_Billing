const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  upload,
} = require('../controllers/profile');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', upload.single('profilePicture'), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
