const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

// ================ get endpoints

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
});

// needs editing
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    if (db.findById(userId) === false) {
        console.log('error')
        res.status(404).json({message: 'The user with the specified ID does not exist.'})
    } else {
    db.findById(userId)
    .then(users => {
        res.status(200).json({success: true, users})
    })
    .catch(err => {
        res.status(500).json({ message: 'The user information could not be retrieved.'})
    })
}});

// ================ delete endpoints

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
    .then(res => {
        res.status(200).json({success: true, res})
    })
    .catch(err => {
        res.status(500).json({error: 'The user could not be removed.'})
    })
});

// ================ post endpoints

server.post('/api/users/', (req, res) => {
    const user = req.body;
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('bio')) {
        res.status(400).json({errorMessage: 'Please provide name and bio for user'})
    } else {
    db.insert(user)
    .then(() => {
        res.status(201).json(req.body)
    })
    .catch(() => {
        res.status(500).json({success: false, error: 'There was an error while saving the user to the database'})
    })
}});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    db.update(id, user)
    .then(updatedUser => {
        if (!updatedUser) {
            res.status(404).json({message: 'no user found.' })}
        else {
            res.status(500).json({success: true, user})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'user info could not update'})
    })
});













server.listen(4000, () => {
    console.log('\n server running on port 4000 \n')
});