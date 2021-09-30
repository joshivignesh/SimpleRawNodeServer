var express = require('express')
var app = express()

app.route('/node').get(function(req, res){
    res.send("This is sample Node tutorial")
})

app.route('/react').get(function(req, res){
    res.send("This is a React tutorial")
})

app.route('/express').get(function(req, res){
    res.send("This is a Express tutorial")
})

app.listen(3000, function() {})