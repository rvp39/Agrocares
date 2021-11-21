var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie: true });

app.use(cookieParser());
app.use(csrfMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));
app.set("view engine","ejs");


app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });



app.get("/",function(req,res){

    res.render("index");
});

app.get("/home",function(req,res){
    res.render("home");
});










app.listen(3000)