const express = require("express");
const router = express.Router();

router.get("/posts/new", function(req, res){


  res.render("compose", {article: articles});


});


module.exports = router;
