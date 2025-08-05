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
        type: String,
    },
})
 
//model
module.exports = mongoose.model("book", bookSchema); // 

