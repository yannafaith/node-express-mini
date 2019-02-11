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
        res.status(err.code).json({success: false, message: err.message})
    })
});

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.findById(userId)
    .then(users => {
        res.status(200).json({success: true, users})
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
});

// ================ delete endpoints

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db.remove(userId)
    .then(res => {
        res.status(200).json({success: true, res})
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
});

// ================ post endpoints

server.post('/api/users/', (req, res) => {
    const user = req.body;
    // if (req.body != )
    db.insert(user)
    .then(user => {
        res.status(201).json(req.body)
    })
    .catch(err => {
        res.status(err.code).json({success: false, message: err.message})
    })
});













server.listen(4000, () => {
    console.log('\n server running on port 4000 \n')
});