const express = require('express');
const cors = require('cors')

const  {connectdb} = require("./config/connection.js")

require('dotenv').config()
const PORT = process.env.PORT


const authRouter = require('./routes/auth.js')
const bookRouter = require('./routes/book.js')
const userRouter = require('./routes/user.js')
const orderRouter = require('./routes/order.js')
const app = express();

app.use(cors({
    origin : 'http://127.0.0.1:5500'
}))

app.get('/', (req, res) => {
    res.send("Welcome to the BOOKSTORE homepage!!")
})

//connection
connectdb(process.env.MONGO_URI)

//middleware
app.use(express.json()) 

//Routes
app.use("/api/orders", orderRouter)
app.use("/api/auth", authRouter)
app.use("/api/books", bookRouter)
app.use("/api/users", userRouter)



app.listen(PORT, () => {
    console.log(`Server is working at http://localhost:${PORT}`)
})

