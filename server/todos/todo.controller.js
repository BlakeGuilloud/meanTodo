const express   = require('express');
const app       = express();
const Todo      = require('./todo.schema');

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
            complete: req.body.complete,
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

module.exports = app;
