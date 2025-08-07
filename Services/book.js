const Book = require('../models/bookModel')

async function findAndVerifyOwner(bookId, userId){
    const book= await Book.findById(bookId)
    if (!book) {
        throw new Error("book not found")
    }
    if(userId!==book.userId.toString()){
        throw new Error('Only owner can perform this action')
    }  
}

module.exports = {findAndVerifyOwner}