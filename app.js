'use strict';

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const TodoRoute   = require('./server/todos/todo.controller');

const db    = process.env.MONGODB_URI || 'mongodb://localhost/todoList';
const port  = process.env.PORT || 8100;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(express.static(__dirname));

app.use('/', TodoRoute);

app.listen(port, () => {
    console.log('app listening on port' + port);
});

exports = module.exports = app;
