const express = require("express");
const Article = require('./../models/mongoose.js')
const router = express.Router();



router.get("/new", function(req, res){


  res.render("compose", {article: new Article() });


});

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('single', { article: article })
})



router.post('/', async (req, res) => {

   let article = new Article ({
    title : req.body.title,
    description : req.body.content,
    nType : req.body.nType,
    markdown: req.body.markdown
  })
try {
     article = await article.save()
     res.redirect(`/notices/${article.slug}`)
   } catch (e) {
     console.log(e)
     res.render(`compose`, { article: article })
   }

});





module.exports = router;
