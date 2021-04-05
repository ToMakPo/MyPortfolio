require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const apiRoutes = require("./routes")
const PORT = process.env.PORT

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(process.env.NODE_ENV === "production" 
//     ? express.static("client/build")
//     : express.static("client/public")
// )
app.use(express.static("client/public"))

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(apiRoutes)

app.listen(PORT, () => {
    console.info(`App running on http://localhost:${PORT}`)
})

