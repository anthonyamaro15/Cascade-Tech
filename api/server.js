const express = require("express");
const authRoute = require("../routes/authRoutes");

// we need to pass this function as middleware to be able to add authorization to the auth users routes.
const restrictedRoute = require("../middlewares/userRestricted");

const server = express();

server.use(express.json());

server.use("/api/auth", authRoute);

module.exports = server;
