const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const dbURI = 'your-monodb-uri'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => app.listen(5000)) // it takes some time to connect to db, so app should only listen to port once it is connected to db.
        .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 - always at a bottom, similar to default if all above routes doesn't match
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });  //necessary to pass status_code. else it will use 200 success.
});
