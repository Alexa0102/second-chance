const mongoose = require('mongoose');
const { Schema, model,  Types: { ObjectId } } = require('mongoose');

// const { ObjectId } = mongoose.Schema.Types;

const bookSchema = new Schema({
    name: {
        required: true,
        type: String,
        minlength: [3, 'You should have at least 3 characters!']
    },
    author: {
        required: true,
        type: String,
        minlength: [5, 'You should have at least 5 characters!']
    },
    year: {
        required: true,
        type: Number,
        max: [2022, 'Car year cannot be in the future!']
    },
    description: {
        required: true,
        type: String,
        minlength: [10, 'Description should have at least 10 characters!'],
        maxlength: [50, 'Description shouldn\'t have more than 50 characters!'],
    },
    imageUrl: {
        required: true,
        type: String,
    },
    owner: { type: ObjectId, ref: 'User'}
});
// , { timestamps: { createdAt: 'created_at' } }

bookSchema.method('getWished', function () {
    return this.wishingList.map(x => x._id);
})
const Book = model('Book', bookSchema);
module.exports = Book;