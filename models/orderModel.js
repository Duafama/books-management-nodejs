const mongoose= require('mongoose')

const orderSchema = new mongoose.Schema({
    bookId:{   //ref: 'Book' should be used ik
        type:mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    quantity:{
        type: Number,
        required: true
    },
    status:{
        type:String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
})

module.exports = mongoose.model("order", orderSchema)