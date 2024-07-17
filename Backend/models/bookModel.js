const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        authors: {
            type: [String],
            required: true
        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        genre: {
            type: String,
            required: true
        },
        publishedYear: {
            type: Number,
            required: true
        },
        numberOfCopies: {
            type: Number,
            required: true
        },
        availableCopies: {
            type: Number,
            required: true
        },
        publisher: {
            type: String,
            required: true
        }
    },
    {
        collection: 'bookDataCollection2'
    }
);

module.exports = mongoose.model('bookDataCollection2', bookSchema);