var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    topic : {
        type: String,
        required: true
    },
    detail : {
        type: String
    },
    completed : {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('TodoSchema',TodoSchema);