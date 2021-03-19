const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen request
app.listen(3000);

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
