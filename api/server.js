// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    console.log("request received 👍")
    res.send("Here are your users")
})

/** structure : 
 * {
    id: "a_unique_id", // String, required
    name: "Jane Doe",  // String, required
    bio: "Having fun", // String, required
  }
*/

server.get("/api/users", (req, res) => {
    Users.find()
    .then(result => {
        res.json(result);
    })
    .catch(res => {
        res.status(500).json({ message: "The users information could not be retrieved" })
    })
})

// GET /api/users/:id

// POST /api/users 

// PUT /api/users/:id

// DELETE /api/users/:id
module.exports = server; // EXPORT YOUR SERVER instead of {}
