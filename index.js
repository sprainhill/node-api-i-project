// implement your API here
const express = require("express");

// import db file

const db = require("./data/db"); // use db to get access to database

// db has a find(), findById(), insert(), update(), and remove() methods
// which we will use to access the database

const server = express();

// tell express to parse JSON
server.use(express.json());

// POST a new user
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log("newUser body", newUser);

  if (!newUser.name || !newUser.bio) {
    res.status(400).json({ message: "Name and bio required" });
  } else {
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({ message: "Error adding new user" });
      });
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`API running on port ${port} `);
});
