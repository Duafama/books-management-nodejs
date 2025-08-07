const Order= require('../models/orderModel')
const Book= require('../models/bookModel')

async function handleGetAll(req, res){
    try{
        const orders = await Order.find()
        return res.json(orders)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Failed to get all Orders"})
    }
}

async function handleGetById(req, res){
    try {
        const order = await Order.findById(req.params.id)
        if(!order) return res.status(404).json({error: "Order not found"})
        return res.json(order)
    } catch (err) {
         console.log(err)
        res.status(500).json({error: "Failed to get Order"})
    }
}

async function handleNewOrder(req, res){
    try{    
        const {bookId, quantity, status} = req.body
        const book= await Book.findById(bookId)
        if(book.status=== "draft") 
            return res.json({error: "This book's not published yet"})
        if(book.userId.toString()===req.user._id) 
            return res.json({error: "The seller cannot buy his own book"})
        if(book.leftQuantity<1) 
            return res.json({error: "Book Out of stock"})
        if (quantity>book.leftQuantity) 
            return res.json({error: "Not enough stock left"})
        await Order.create({
            bookId,
            userId: req.user._id,
            quantity,
            status
        })
        book.leftQuantity -= quantity
        await book.save()
        return res.status(201).json({msg:"Order placed successfully" })
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Failed to place order"})
    }
}

async function handleUpdateOrder(req, res){
    try{
        const {status} =req.body
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {status}, { new: true, runValidators: true })
        return res.json(updatedOrder)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Failed to update order"})
    }
}

async function handleDeleteOrder(req, res){
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: "done"}); 
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Failed to delete order"})
    }
}

module.exports = {handleGetAll, handleNewOrder, handleUpdateOrder, handleDeleteOrder, handleGetById}