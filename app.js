const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // importing blog model

// express app
const app = express();

// connect to mongodb
const dbURI = 'your-monodb-uri'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(3000)) // it takes some time to connect to db, so app should only listen to port once it is connected to db.
        .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// morgan middleware
app.use(morgan('dev'));

// mongoose and mongodb sanbox routes - 
// get handler to create blog
app.get('/add-blog', (req, res) => {
  const blog = new Blog({  // creating instance of a Blog model with parameters.
    title: 'second new blog',
    snippet: 'more about second blog',
    body: 'Some lorem ipsum about first new blog'
  });

  blog.save() // save method to save instance in database
    .then((result) => { // a promise coz it takes some time to save in db
      res.send(result)
    })
    .catch((err) => console.log(err));
});

// get handler to fetch all blogs from db
app.get('/all-blogs', (req, res) => {
  Blog.find() // gets all collection of particular model
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// get handler to fetch single blog from db
app.get('/blog', (req, res) => {
  Blog.findById('6054d8eaf8ad4859d133463c') // gets all collection of particular model
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.log(err));
});

// middleware & static files
app.use(express.static('public'));

// use() is used as a middleware function and accepts on callback function as an argument
// app.use((req, res, next) => { // next object mandatory to pass and use as a function to move to next middleware
//   console.log('new request made');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next(); // a methods helps to move to next middleware
// })

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a New Blog' });
})

// 404 - always at a bottom, similar to default if all above routes doesn't match
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });  //necessary to pass status_code. else it will use 200 success.
})
