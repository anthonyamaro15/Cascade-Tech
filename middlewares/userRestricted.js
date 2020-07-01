const jwt = require("jsonwebtoken");

// we check if we pass the user token in the header.
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(
      authorization,
      process.env.SECRET || "secret",
      (error, decodedToken) => {
        if (error) {
          res.status(401).json({ errMessage: "Invalid credentials" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ errMessage: "No credentials Provided" });
  }
};
