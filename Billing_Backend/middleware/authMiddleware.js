// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/profile");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, "your_secret_key");
      console.log(JSON.stringify(decoded));
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed", error: error.message });
    }
  }
  else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
