const express = require("express");
const { validateBody } = require("../validateData/validateBody");
const { updateData } = require("../helperFunctions/updateData");

const route = express.Router();

let data = [];

// POST /api/auth/register
route.post("/register", validateBody, (req, res) => {
  const body = req.body;

  const uniqueEmail = data.find((user) => user.email === body.email);

  //we check if the user with that email exist or not.
  if (uniqueEmail) {
    res.status(400).json({ errMessage: "Email is already taken" });
  } else {
    data.push(body);
    res.status(201).json(body);
  }
});

route.post("/login", (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();

  const uniqueEmail = data.find((user) => user.email === email);
  const checkPassword = data.find((user) => user.password === password);

  // checking if the user already exist
  if (!uniqueEmail) {
    return res.status(400).json({ errMessage: "user doesn't exist" });
  } else {
    // now we check if exist but typed the wrong password
    if (checkPassword === undefined) {
      // we check if the event method exist and if it does'nt we have to create it
      // and if it does we can just push the type FAILED and the time.
      if (uniqueEmail.event === undefined) {
        const updateFail = {
          ...uniqueEmail,
          event: [{ type: "FAILED", created: timestamp }],
        };

        // this function is incharge of updating our data.
        data = updateData(data, updateFail);
      } else {
        uniqueEmail.event.push({ type: "FAILED", created: timestamp });
        return res
          .status(400)
          .json({ errMessage: "incorrect email or password" });
      }
    }
  }

  // we assume the user typed the correct password, now we need to check if the event method exist or not.
  if (uniqueEmail.event === undefined) {
    const newUserValues = {
      ...uniqueEmail,
      event: [{ type: "LOGIN", created: timestamp }],
    };
    // we update our data depending if the type was LOGIN or FAILED.
    data = updateData(data, newUserValues);

    return res.status(200).json(uniqueEmail);
  } else {
    uniqueEmail.event.push({ type: "LOGIN", created: timestamp });
    return res.status(200).json(uniqueEmail);
  }
});

// GET /api/auth/allusers
route.get("/allusers", (req, res) => {
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ errMessage: "data is empty" });
  }
});

module.exports = route;
