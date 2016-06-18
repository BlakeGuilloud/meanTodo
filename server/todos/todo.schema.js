'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title:    String,
    complete: {
      type: Boolean,
      default: false
    },
});

module.exports = mongoose.model('Todo', TodoSchema);
