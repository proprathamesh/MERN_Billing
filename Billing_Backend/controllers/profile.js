const User = require('../models/profile');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');

dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'logos/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB (adjust as needed)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Exporting `upload` along with other functions
module.exports = {
  upload,
  registerUser: async (req, res) => {
    const { username, email, password, mobile, companyName, address } = req.body;

    try {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const profileImagePath = req.file.path;
      const user = await User.create({
        username,
        email,
        password,
        mobile,
        companyName,
        address,
        profilePicture: profileImagePath,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user && (await user.comparePassword(password))) {
        const token = generateToken(user.id);
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: token,
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },

  updateUserProfile: async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.status = req.body.status || user.status;
      user.profilePicture = req.body.profilePicture || user.profilePicture;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        status: updatedUser.status,
        profilePicture: updatedUser.profilePicture,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },
};

// Generate JWT function
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
}
