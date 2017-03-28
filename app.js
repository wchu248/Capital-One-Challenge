var express = require("express")
var bodyParser = require('body-parser');
var app = express()

// logging module
app.use(require("morgan")("dev"))

// view engine and static file
app.set('view engine', 'ejs')
app.use(express.static('public'))

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))

const tokenizer = require("./app/index.js")
tokenizer.init(app)
app.get("/api/search", tokenizer.search)
app.post("/result", tokenizer.makeRecommendation)

app.get("/", (req, res) => {
    res.sendfile("public/landing.html")
})


PORT = 8080

app.listen(PORT)
console.log("App running at localhost:" + PORT)