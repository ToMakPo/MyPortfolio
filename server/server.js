require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(process.env.NODE_ENV === "production" 
    ? express.static("client/build")
    : express.static("public")
)

app.listen(PORT, () => {
    console.info(`App running on http://localhost:${PORT}`)
})
