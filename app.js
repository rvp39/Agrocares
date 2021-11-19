var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Views"))
app.set("view engine","ejs")






app.get("/",function(req,res){

    res.render("index");
});

app.get("/home",function(req,res){
    res.render("home");
});










app.listen(3000)