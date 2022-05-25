const mongoose = require('mongoose');

const marked = require('marked');
const slugify = require('slugify');
const articleSchema = new mongoose.Schema ({
  title:{
    type: String,
    required: true
  },
nType: {
    type: String,
  },
  description: {
    type: String,
      required: true
  },
  markdown: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }

})
articleSchema.pre('validate', function(next) {
  if ( this.title) {
    this.slug =  slugify(this.title, {
        lower: false,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
      })

  }
  next()
});


module.exports = mongoose.model('Article', articleSchema);
