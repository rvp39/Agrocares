
var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie: true });
const Firebase = require("firebase");
import('./Firebase/config.mjs')





app.use(cookieParser());
app.use(csrfMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));
// Specific folder example
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/img', express.static(__dirname + 'static/images'))

// Set View's
app.set('views', './Views');
app.set('view engine', 'ejs');

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
  });


//const db = firebase.firestore();
//const User = db.collection("Users");

app.get("/",function(req,res){

    res.render("index");
});

app.get("/home",function(req,res){
    res.render("home");
});
app._router.get('/login',(req,res)=>{
    res.render("login");
});
app._router.get('/signup',(req,res)=>{
  res.render("signup");
});









app.listen(3000)