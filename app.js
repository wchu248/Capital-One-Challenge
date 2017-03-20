var express = require("express")
var app = express()

const tokenizer = require("./app/index.js")

tokenizer.init(app)
app.get("/api/search", tokenizer.search)

app.get("*", (req, res) => {
    res.sendfile("views/landing.html")
})

PORT = 8080

app.listen(PORT)
console.log("App running at localhost:" + PORT)