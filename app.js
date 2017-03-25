var express = require("express")
var app = express()

app.use(require("morgan")("dev"))
app.use(express.static('public'))

app.set('view engine', 'ejs')

const tokenizer = require("./app/index.js")
tokenizer.init(app)
app.get("/api/search", tokenizer.search)

app.get("/", (req, res) => {
    res.sendfile("public/views/landing.html")
})

app.get("/results", (req, res) => {
    res.render("search_results", {winston: "nagger"})
})

PORT = 8080

app.listen(PORT)
console.log("App running at localhost:" + PORT)