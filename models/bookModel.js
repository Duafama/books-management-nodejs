const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title:{
        type: String, 
        allowNull: false,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,  
    },
    genre:{
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    userId:{ //Foreign key
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    price:{
        type: Number
    },
    stock:{
        type: Number,
    },
    leftQuantity:{
        type: Number,
    },
    status:{
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }

})
 
//model
module.exports = mongoose.model("book", bookSchema); // 

