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

app.get("/", (req, res) => {
    res.sendfile("public/landing.html")
})

const port = process.env.PORT || 8080
app.set('port', port);
var http = require('http').Server(app)

http.listen(port, () => {
  console.log("Server started on port " + port)
})