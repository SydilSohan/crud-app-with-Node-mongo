const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require('ejs');
const posts = require('./posts.js')
// let articles =  posts;

app.use(express.urlencoded({extended: false}));
const mongoose = require('mongoose');
const router = require('./routes/router.js')

const Article = require('./models/mongoose.js')

app.use('/articles', router);
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async function(req, res){

  let articles = await Article.find().sort({createdAt: 'desc'});

  res.render("articles", {article: articles});


});



// app.get("/posts/new", function(req, res){
//
//   res.render("compose", {article: articles});
//
//
// });
// app.get('/articles/:id', (req, res) => {
// res.render('/')
// })

// app.post('/articles/new', async (req, res) => {
//   const article = new Article ({
//     title : req.body.title,
//     description : req.body.content,
//     author : req.body.author,
//   })
//
//   try {
//      article = await article.save()
//      res.redirect(`/articles/${article.id}`)
//    } catch (e) {
//      res.render(`articles/new`, { article: article })
//    }
//
// });





let port = 3000;
app.listen(process.env.PORT || port, function(){
  console.log("Server is running on http://localhost:" + port + "  :D  ");

});
