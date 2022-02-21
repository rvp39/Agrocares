
var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
var bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie: true });
const Firebase = require("firebase");
import('./Firebase/config.mjs')

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



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

//authentication
app._router.get('/login',(req,res)=>{
    res.render("login");
});
app._router.get('/signup',(req,res)=>{
  res.render("signup");
});
app.get("/profile", function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((userData) => {
      console.log("Logged in:", userData.email)
      res.render("profile.html");
    })
    .catch((error) => {
      res.redirect("/login");
    });
});
app.post("/sessionLogin", (req, res) => {
  const idToken = req.body.idToken.toString();
  if(error){
    console.error();
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
});

app.get("/sessionLogout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});

app.get("/forum",function(req,res){

  res.render("forum");
});
app.get("/farmguide",function(req,res){

  res.render("farmguide");
});





app.listen(3000)