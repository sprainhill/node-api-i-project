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
  const { name, bio } = req.body;
  console.log("POST user req.body", req.body);

  if (!name || !bio) {
    res.status(400).json({ message: "Name and bio required" });
  } else {
    db.insert(req.body)
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

// GET users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "You aint gittin these users, ERROR" });
    });
});

// GET user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "No user with that id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Erro retrieving user by id" });
    });
});

// DELETE user by id
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        db.remove(id).then(count => {
          res.status(200).json({ message: `${count} user records removed` });
        });
      } else {
        res.status(404).json({ message: "No user with that id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error retrieving user by id" });
    });
});
