const Book = require('../models/bookModel');

async function handleGetAll(req, res){
    try {
        const books = await Book.find(); 
        res.json(books); //send response i.e all books
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch books" })
    }
}

async function handleCreateNew(req, res){
     try{
        const { title, author, genre, publishedYear } = req.body; 
        await Book.create({
            title,
            author,
            publishedYear,
            genre,
            userId: req.user._id //foreign key from users collection
        })
        return res.status(201).json({msg: "success"}); //successful responses
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Failed to create book" });
    }
}

async function handleGetById(req, res){
    try {
        const book = await Book.findById(req.params.id); 
        if (!book) return res.status(404).json({ error: "Book not found" }); 
        res.json(book); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch book" }); 
    }
}

async function handleUpdateById(req, res){
    try{
        const {title, author, publishedYear, genre} = req.body;

        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ error: "Book not found" });
        
        if (req.user._id !== book.userId) { //only the owner can update the book
            return res.status(403).json({error: "You are not the owner of this book"})
        }

        const updatedBook= await Book.findByIdAndUpdate(req.params.id,
        {title, author, publishedYear, genre},
        { new: true, runValidators: true } ); 
        return res.json(updatedBook);   
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "Failed to update"}); 
    }
}

async function handleDeleteById(req, res){
     try{
        const book = await Book.findById(req.params.id)
        if (!book) return res.status(404).json({ error: "Book not found" });

        if (req.user._id !== book.userId) {//only the owner can update the book
            return res.status(403).json({error: "You are not the owner of this book"}) 
        }
            
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "done"}); 
    }
    catch (err){
        console.error(err);
        res.status(500).json({ error: "Failed to delete book" });
    }
}

module.exports= {handleGetAll, handleCreateNew,  handleGetById, handleUpdateById, handleDeleteById};