const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


exports.getProfile=async(req,res)=>{
   res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });  

}

exports.updateProfile=async(req,res)=>{

  const{name,email}=req.body;

   const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select("-password");

    if(!user){
      return res.json({
        success:false,
        message:"Error occured"
      })
    }

     res.json({
      success: true,
      message: "Profile updated",
      user
    });


}