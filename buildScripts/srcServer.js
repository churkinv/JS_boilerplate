// our server (we use express) configurtation file: port, path determined here

// var express = require('express');
// var path = require ('path');
// var open = require ('open');
import express from 'express';
import path from 'path';
import open from  'open';
import webpack from 'webpack';
import config from '../webpack.config.dev'


/*eslint-disable no-console*/

//var port = 8080;
const port = 8080;
//var app = express();
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler,{
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get ('/', function (req, res){// any ref to the root should be handled by this function
  res.sendFile(path.join(__dirname, '../src/index.html'))
});

app.listen(port, function(err){
  if(err){
    console.log(err);
  } else {
    open ('http://localhost:'+ port);
  }
})