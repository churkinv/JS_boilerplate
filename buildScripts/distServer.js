// Serves our dist folder (prod build)

import express from 'express';
import path from 'path';
import open from  'open';
import compression from 'compression';

/*eslint-disable no-console*/

const port = 8080;
const app = express();

app.use(compression()); // enabling gzip compression, and it is not use in real prod scenarion just to serve on our local machines to opt. the res.
app.use(express.static('dist')); // adding suport serving static files for express

app.get ('/', function (req, res){// any ref to the root should be handled by this function
  res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.get('/users', function(req, res){
  //Hard coding for simplicity. Pretend this hits a readl database
  res.json([
    {"id": 1, "firstName": "Arnold", "lastName": "Shwarzeneger", "email" : "a.shwarzeneger@gaml.com" },
    {"id": 2, "firstName": "Emma", "lastName": "Watson", "email" : "e.watson@gaml.com" },
    {"id": 3, "firstName": "Silvestr", "lastName": "Stalone", "email" : "s.stalone@gaml.com" },
    {"id": 4, "firstName": "Robert", "lastName": "Shiller", "email" : "r.shiller@gaml.com" }
  ]);
});

app.listen(port, function(err){
  if(err){
    console.log(err);
  } else {
    open ('http://localhost:'+ port);
  }
});