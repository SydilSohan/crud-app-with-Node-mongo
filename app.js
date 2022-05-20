const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require('ejs');
const posts = require('./posts.js')
let articles =  posts;
const router = require('./router.js')


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){


  res.render("articles", {article: articles});


});


app.get("/posts/new", function(req, res){


  res.render("compose", {article: articles});


});



let port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log("Server is running on http://localhost:" + port + "  :D  ");

});
