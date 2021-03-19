const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen request
app.listen(3000);

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/about', (req, res) => {
  res.render('about');
})

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
})

// 404 - always at a bottom, similar to default if all above routes doesn't match
app.use((req, res) => {
  res.status(404).render('404');  //necessary to pass status_code. else it will use 200 success.
})
