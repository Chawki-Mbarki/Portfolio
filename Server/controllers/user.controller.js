const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, { httpOnly: true }); // Set token in the cookie
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message); // Log error details
    res.status(500).json({ message: "Error logging in" });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successful" });
};

// Middleware to authenticate the user
const authenticate = (req, res, next) => {
  const token = req.cookies.authToken; // Extract the token from cookies
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log error details
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authenticate,
};
