const jwt = require("jsonwebtoken");

// function in charge to update our data.
function updateData(data, userObj) {
  const newData = data.map((user) => {
    const token = generateToken(user);
    if (user.email === userObj.email) {
      user = userObj;
    }
    return { token, ...user };
  });
  return newData;
}

// generate a token for authorization
function generateToken(user) {
  const payload = {
    user: user.email,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.SECRET || "secret", options);
}

module.exports = {
  updateData,
};
