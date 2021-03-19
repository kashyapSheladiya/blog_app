const express = require('express');

// express app
const app = express();

// listen request
app.listen(3000);

// app.get('/', (req, res) => {
//   res.send('<p>hello</p>');   //automatically sets header and status code
// })

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', {root: __dirname});
})

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', {root: __dirname});
})

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
})

// 404 - always at a bottom, similar to default if all above routes doesn't match
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', {root: __dirname});  //necessary to pass status_code. else it will use 200 success.
})
