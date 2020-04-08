const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    content: String,
    flag:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
