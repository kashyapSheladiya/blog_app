const http = require('http');
const fs = require('fs')

// createServer has one argument callback function, but callback function has 2 object i.e. request and response
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  //response -> 3 steps -> 1. SetHeader, 2.Write response, 3. End response
  res.setHeader('content-Type', 'text/html');
  // res.write('<p>Hello all</p>');
  // res.write('<p>Hello again</p>');
  // res.end(); //imp

  //send html file as a response
  // fs.readFile('./views/index.html', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   } else {
  //     // res.write(data);
  //     res.end(data);
  //   }
  // })


  // Basic Routing

  let path = './views/'
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-me':  // forever redirect
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })


});

// arguments: portnumber, hostname(by default hostname is `localhost`), callback function
server.listen(3000, 'localhost', () =>{
  console.log('server listining on port 3000');
});
