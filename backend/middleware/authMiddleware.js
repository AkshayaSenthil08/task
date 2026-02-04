const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const existingUser = await User.findById(decoded.userId).select("-password");

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = existingUser;  
    req.userId = existingUser._id; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalid" });
  }
};

module.exports = authMiddleware;
