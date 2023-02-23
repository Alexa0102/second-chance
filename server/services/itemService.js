const Item = require("../models/Item")
const jwtDecode = require('jwt-decode');


const addItem = async (item, id) => {
    try {
        item.owner = id;
        return await Item.create({ ...item })
    } catch (error) {
        throw new Error(error)
    }
}

const getAllItems = async () => {
    return await Item.find({})
}

const getOneItem = async (id) => {
    return await Item.findById(id).populate('owner')
}

const getProfileItems = async (_id) => {
    try {
        const result = await Item.find({ owner: _id})
        return result
    } catch (err) {
        console.error(err)
    }
}
const editItem = async (id, data) => {
    try {
        return await Item.findByIdAndUpdate(id, { ...data }, { runValidators: true })
    } catch (error) {
        return error
    }
}
// const getThreeBooks = async () => {
//     try {
//         const books = await Book.find({}).limit(3)
//         return books

//     } catch (error) {
//         console.error(error)
//     }
// }


const deleteItem = async (id) => {
    await Book.findByIdAndDelete(id)
}
module.exports = {
    getAllItems,
    addItem,
    getOneItem,
    editItem,
    deleteItem,
    getProfileItems,
}