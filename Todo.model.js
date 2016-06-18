'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title:    String,
    author:   String,
    complete: { type: Boolean, default: false },
    date:     String
});

module.exports = mongoose.model('Todo', TodoSchema);
