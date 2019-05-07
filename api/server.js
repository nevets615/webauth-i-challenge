const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();
const sessionConfig = {
  name: "monster",
  secret: "keep it secret, keep it safe",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 1,
    secure: false
  },
  resave: false,
  saveUninitialized: true
};

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("It's alive!");
});

module.exports = server;