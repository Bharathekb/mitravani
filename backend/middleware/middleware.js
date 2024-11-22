const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired. Please log in again.");
    }
    return res.status(401).send("Invalid token");
  }
};

module.exports = middleware;
