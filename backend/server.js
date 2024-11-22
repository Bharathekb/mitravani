require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Registeruser = require("./models/user");
const middleware = require("./middleware/middleware");  // Import the middleware
const cors = require("cors");

const app = express();

// MongoDB URI and JWT Secret from environment variables
const jwtSecret = process.env.JWT_SECRET;  // Ensure the correct name here
const uri = process.env.MONGODB_URI;

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(cors({ origin: "*" })); // Enable CORS for all origins

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    // Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords do not match");
    }

    // Check if the email already exists
    const existingUserByEmail = await Registeruser.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).send("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new Registeruser({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).send("Registered successfully");
  } catch (err) {
    console.error("Error during registration:", err);

    // Check if the error is a duplicate key error for email
    if (err.code === 11000 && err.keyPattern.email) {
      return res.status(400).send("Email already exists");
    }

    return res.status(500).send("Internal Server Error");
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists by email
    let user = await Registeruser.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Incorrect password");
    }

    // Create JWT payload
    let payload = {
      user: {
        id: user.id,  // User ID that will be embedded in the token
      },
    };

    // Sign the JWT with the provided secret and set an expiration time (e.g., 1 hour)
    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error("JWT Signing Error:", err);
        return res.status(500).send("Internal Server Error");
      }

      // Send the token back to the client
      return res.status(200).json({ token });
    });

  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/dashboard", middleware, async (req, res) => {
  try {
    const user = await Registeruser.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    res.json(user); // Return the user data
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send("Server error");
  }
});

// Add this route to your server.js
app.get("/users", middleware, async (req, res) => {
  try {
    // Fetch all users, excluding their password field for security
    const users = await Registeruser.find({}, 'username'); // Only get 'username'
    res.json(users); // Return the list of users
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});
// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
