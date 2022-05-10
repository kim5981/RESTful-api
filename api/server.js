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
        if( !user ) {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist",
            })
        }
      res.json(user)  
    })  
    .catch(err => {
        res.status(500).json({
             message: "error getting user",
             err: err.message,
             stack: err.stack
            })
    })
})

// POST /api/users 

server.post("/api/users/", (req, res) => {
    const user = req.body
    if( !user.name || !user.bio ) {
        res.status(400).json({
            message: "Please provide name and bio for the user",
        })
    } else {
        Users.insert(user)
        .then( addedUser => {
            res.status(201).json(addedUser)
        })
        .catch(err => {
            res.status(500).json({
                 message: "error creating user",
                 err: err.message,
                 stack: err.stack
                })
        })
    }
})

// PUT /api/users/:id
server.put("api/users/:id", (req, res) => {
    const user = req.body
    if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    } else {
        Users.update(user)
        .then(update => {
            console.log(update)
        })
        .catch(err => {
            res.status(500).json({
                message: "error updating user",
                err: err.message,
                stack: err.stack
               })
        })
    }
    
})


// DELETE /api/users/:id
server.delete("/api/users/:id", async (req, res) => {
    try {
        const possibleUser = await Users.findById(req.params.id)
    if(!possibleUser) {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    } else {
        const deletedUser = await Users.remove(possibleUser.id)
        res.status(200).json(deletedUser)
    }
    } catch (err) {
        res.status(500).json({
            message: "error deleting user",
            err: err.message,
            stack: err.stack
           })
    }
})

module.exports = server; 

/**
 * module.exports = global object
 * w/e it's set to is then required from other modules
 */