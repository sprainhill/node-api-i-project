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
  
  // UPDATE user by id
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  
  if (changes.name && changes.bio) {
    db.update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `${count} user records updated` });
      } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error updating user" });
      });
    } else {
      res.status(400).json({ message: "name and bio are required" });
    }
  });

  let hobbits = [
    {
      id: 1,
      name: 'Bilbo Baggins',
      age: 111,
    },
    {
      id: 2,
      name: 'Frodo Baggins',
      age: 33,
    },
  ];
  let nextId = 3;
  
  // and modify the post endpoint like so:
  server.post('/hobbits', (req, res) => {
    const hobbit = req.body;
    hobbit.id = nextId++;
  
    hobbits.push(hobbit);
  
    res.status(201).json(hobbits);
  });

  // GET hobbits
  server.get('/hobbits', (req, res) => {
    // query string parameters get added to req.query
    const sortField = req.query.sortby || 'id';
  
    // apply the sorting
    const response = hobbits.sort(
      (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
    );
  
    res.status(200).json(response);
  });

  // PUT hobbits
  server.put('/hobbits/:id', (req, res) => {

    const hobbit = hobbits.find(h => h.id == req.params.id);

    if (!hobbit) {
      res.status(404).json({ message: `Hobbit doesn't exist, my guy`});
    } else {
      // modify the existing hobbit
      Object.assign(hobbit, req.body)
      res.status(200).json(hobbit);
    }
  });
  
  const port = 8000;
  server.listen(port, () => {
    console.log(`API running on port ${port} `);
  });