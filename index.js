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

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({message: 'The user with the specified ID does not exist.' })
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The user information could not be retrieved.'})
    })
});

// ================ delete endpoints

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
    .then(deletion => {
        if (!deletion) {
            res.status(404).json({message: 'The user with the specified ID does not exist.'})
        }
        else {
            res.status(204).end()
        }
    })
    .catch(() => {
        res.status(500).json({error: 'The user could not be removed.'})
    })
});

// ================ post endpoints

server.post('/api/users/', (req, res) => {
    const user = req.body;
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('bio')) {
        res.status(400).json({errorMessage: 'Please provide name and bio for user.'})
    } else {
    db.insert(user)
    .then(() => {
        res.status(201).json(req.body)
    })
    .catch(() => {
        res.status(500).json({error: 'There was an error while saving the user to the database.'})
    })
}});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    db.update(id, user)
    .then(userMatch => {
        if (!userMatch) {
            res.status(404).json({message: 'The user with the specified ID does not exist.' })
        }
        else if (!user.name || !user.bio) {
            res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
        }
        else {
            res.status(200).json({userMatch})
        }
    })
    .catch(( )=> {
        res.status(500).json({error: 'The user information could not be modified.'})
    })
});













server.listen(4000, () => {
    console.log('\n server running on port 4000 \n')
});