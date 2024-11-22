const mongoose = require("mongoose");

let Registeruser = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    // Removed the unique constraint for username
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"],
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

module.exports = mongoose.model("Registeruser", Registeruser);
