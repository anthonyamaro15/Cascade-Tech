// incharge to make sure we have the required field when signing up
function validateBody(req, res, next) {
  const { email, password, phone } = req.body;

  if (!email || !password || !phone) {
    res.status(400).json({ errorMessage: "Please enter require fields." });
  } else {
    next();
  }
}

module.exports = {
  validateBody,
};
