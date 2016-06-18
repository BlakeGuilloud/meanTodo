'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./Todo.model');

const db = 'mongodb://localhost/test12';
const port = process.env.PORT || 3000;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(express.static(__dirname));

app.get('/todos', (req, res) => {
    Todo.find({
    })
    .exec((err, todos) => {
        if(err) {
            res.send('error has occured');
        } else {
            res.json(todos);
        }
    });
});

app.get('/todos/:id', (req, res) => {
    Todo.findOne({
        _id: req.params.id
    })
    .exec((err, todo) => {
        if(err) {
            res.send('error in Todo');
        } else {
            res.json(todo);
        }
    });
});

app.post('/todos', (req, res) => {
    Todo.create(req.body, (err, todo) => {
        if (err) {
            res.send('error has occured');
        } else {
            res.send(todo);
        }
    });
});

app.put('/todos/:id', (req, res) => {
    Todo.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: {
            title:    req.body.title,
            author:   req.body.author,
            complete: req.body.complete,
            date:     Date.now()
        }
    }, {
        upsert: true
    }, (err, todo) => {
        if (err) {
            res.send('error has occured');
        } else {
            res.send(todo);
        }
    });
});

app.delete('/todos/:id', (req, res) => {
    Todo.findOneAndRemove({
        _id: req.params.id
    }, (err, todo) => {
        if (err) {
            res.send('error has occured');
        } else {
            res.send(todo);
        }
    });
});

app.listen(port, () => {
    console.log('app listening on port' + port);
});

exports = module.exports = app;
