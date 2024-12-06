const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Remove 'Bearer' prefix

  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user; // Store the user ID in the request object
    next();
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({ error: "Token is not valid" });
  }
};
