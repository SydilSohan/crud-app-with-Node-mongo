const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require('ejs');
const moment = require('moment');
app.use(express.urlencoded({extended: false}));
const mongoose = require('mongoose');
const router = require('./routes/router.js')
const Article = require('./models/mongoose.js')

// app.use('/notices', router);
// mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
app.use('/notices', router);
mongoose.connect('mongodb+srv://sydilSohan:nus4lyfe@cluster0.xthnm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/backend", async function(req, res){

  let articles = await Article.find().sort({createdAt: 'desc'});




  res.render("articles", {article: articles});


});

app.get("/", async function(req, res){

  let articles = await Article.find().sort({createdAt: 'desc'});
  let important = await Article.find({nType: 'Important'}).sort({createdAt: 'desc'});
  let assignments = await Article.find({nType: 'Assignments'}).sort({createdAt: 'desc'});


  res.render("allnotices", {article: articles, important: important, assignments: assignments});

});

app.get("/noticesN", async function(req, res){

  let articles = await Article.find().sort({createdAt: 'desc'});
  let important = await Article.find({nType: 'Important'}).sort({createdAt: 'desc'});
  let assignments = await Article.find({nType: 'Assignments'}).sort({createdAt: 'desc'});


  res.render("Notices", {article: articles, important: important, assignments: assignments});

});
app.get('/:slug', async function (req, res){
  await Article.deleteOne({slug: req.params.slug})
  res.redirect('/backend')
})
let port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log("Server is running on http://localhost:" + port + "  :D  ");

});
