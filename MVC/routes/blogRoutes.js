const express = require('express');
const Blog = require('../models/blog'); // importing blog model, .. coz we need to get out of directory

const router = express.Router(); // create new router instance of express

router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((results) => {
      res.render('index', {title: 'All Blogs', blogs: results})
    })
    .catch((err) => console.log(err));
});

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});


router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
});

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Detail', blog: result});
    })
    .catch((err) => console.log(err));
});

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});


module.exports = router;
