const jwt = require("jsonwebtoken");
const config=require("../config/env")

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }
  try {
    const decoded = jwt.verify(token,config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invaild token",
    });
  }
};
