const { addItem, getAllItems, getOneItem, editItem, deleteItem, getProfileItems, } = require('../services/itemService');
const { updateBooks } = require('../services/userService');
const jwtDecode = require('jwt-decode');
const User = require('../models/User');
const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    try {
        const userId = token._id;
        const item = await addItem(data, userId)
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/', async (req, res) => {
    const items = await getAllItems()
    res.status(200).json(items)
})


// router.get('/top', async (req, res) => {
  
//     const books = await getT()
//     res.status(200).json(books)
// })
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        
        const item = await getOneItem(id);
        if (item) {
            res.status(200).json(item)
        } else {
            throw new Error('Invalid item ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const item = await getOneItem(id);
    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        if (userId == item.owner._id) {
            await editItem(id, data)
            const updateItem = await getOneItem(id)
            res.status(200).json(updateItem)
        } else {
            throw new Error('You are not the owner!')
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    await deleteItem(req.params.id);
    res.status(200).json('item deleted!')
});

router.post('/myitems', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);
    const userId = token._id;
    const items = await getProfileItems(userId);
    res.status(200).json(items)
    res.end()
})
module.exports = router;