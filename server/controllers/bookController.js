const { getAllBooks, addBook, getOneBook, editBook, getProfileBooks, getThreeBooks,deleteBook } = require('../services/bookService');
const { updateBooks } = require('../services/userService');
const jwtDecode = require('jwt-decode');
const User = require('../models/User');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    try {
        const userId = token._id;
        const book = await addBook(data, userId)
        res.status(201).json(book)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/', async (req, res) => {
    const books = await getAllBooks()
    res.status(200).json(books)
})


router.get('/top', async (req, res) => {
  
    const books = await getThreeBooks()
    res.status(200).json(books)
})
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        
        const book = await getOneBook(id);
        if (book) {
            res.status(200).json(book)
        } else {
            throw new Error('Invalid book ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const book = await getOneBook(id)
    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        if (userId == book.owner._id) {
            await editBook(id, data)
            const updatedBook = await getOneBook(id)
            res.status(200).json(updatedBook)
        } else {
            throw new Error('You are not the owner!')
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    await deleteBook(req.params.id);
    res.status(200).json('book deleted!')
});

router.post('/mybooks', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    const userId = token._id;
    const books = await getProfileBooks(userId);
    res.status(200).json(books)
    res.end()
})
module.exports = router;