const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// express app
const app = express();

// connect to mongodb
const dbURI = 'your-monodb-uri'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(3000)) // it takes some time to connect to db, so app should only listen to port once it is connected to db.
        .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(morgan('dev'));

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
