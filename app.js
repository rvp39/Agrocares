var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie: true });

app.use(cookieParser());
app.use(csrfMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
// Specific folder example
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/img', express.static(__dirname + 'static/images'))

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
app._router.get('/login',(req,res)=>{
    res.render("login");
});









app.listen(3000)