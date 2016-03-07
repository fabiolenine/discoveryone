var express = require('express');
var http    = require('http')
var io      = require('socket.io')(http);
var vhost   = require('vhost');
var socket  = require('./public/javascripts/volatilechat/socket.js');

// Roteamento de domínio e sub-domínios
var app                         = express();

app.listen(3000); 

//https.createServer(options, app).listen(443);

// Parametrização dos caminhos estaticos public e de views
app.use(express.static('public/moreiradedeus'));
app.set('view engine','ejs');
app.set('views','views/moreiradedeus');

// Roteamento do Rest
app.get('/', function(req, res){
    res.render('index.ejs');
});

app.use(function(req, res, next) {
  res.status(404).render('404.ejs');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

io.on('connection', socket);