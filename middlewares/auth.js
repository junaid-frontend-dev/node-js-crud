const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (req, res, next) => {
  try {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(403).json({
        message: "unauthorized token",
      });
    }
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "token invalid",
      error,
    });
  }
};

module.exports = ensureAuthenticated;
