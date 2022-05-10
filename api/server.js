const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    console.log("request received 👍")
    res.send("Here are your users")
})

// GET /api/users
server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "error getting users",
                err: err.message,
                stack: err.stack,
            })
        })
})

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
      res.json(user)  
    })  
    .catch(err => {
        res.status(404).json({
             message: "The user with the specified ID does not exist",
             err: err.message,
             stack: err.stack
            })
    })
})

// POST /api/users 

server.post("/api/users/", (req, res) => {
    Users.insert(req.body)
    .then( result => {
        if ( result == null ) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            res.json(result);
        }
    })
})

// PUT /api/users/:id


// DELETE /api/users/:id
module.exports = server; 

/**
 * module.exports = global object
 * w/e it's set to is then required from other modules
 */