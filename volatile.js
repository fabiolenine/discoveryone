var express = require('express');
var http    = require('http')
var io      = require('socket.io')(http);
var vhost   = require('vhost');
var socket  = require('./public/javascripts/volatilechat/socket.js');

var app             = express();
var appVolatilechat = express();

app.use(vhost('volatilechat.com',appVolatilechat));

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','views/lenines');

appVolatilechat.use(express.static('public'));
appVolatilechat.set('view engine','ejs');
appVolatilechat.set('views','views/volatilechat');

app.get('/', function(req, res){
    res.render('index.ejs');
});

appVolatilechat.get('/', function(req, res){
    var language = req.headers["accept-language"];
    
    switch (language) {
            case "pt-br":   // Portuguese
                res.render('index_ptbr.ejs');
                break;
//            case "fr":      // French
//                res.sendFile(__dirname + '/index_fr.html');
//                break;
//            case "de":      // German
//                res.sendFile(__dirname + '/index_de.html');
//                break;
//            case "ru":      // Russian
//                res.sendFile(__dirname + '/index_ru.html');
//                break;
//            case "ar":      // Arabic
//                res.sendFile(__dirname + '/index_ar.html');
//                break;
//            case "es":      // Spanish
//                res.sendFile(__dirname + '/index_es.html');
//                break;
//            case "hi":      // Hindi
//                res.sendFile(__dirname + '/index_hi.html');
//                break;
//            case "ko":      // Korean
//                res.sendFile(__dirname + '/index_ko.html');
//                break;
//            case "zh":      //  Chinese
//                res.sendFile(__dirname + '/index_zh.html');
//                break;
//            case "zh-Hans": //  Chinese (Simplified)
//                res.sendFile(__dirname + '/index_zhhans.html');
//                break;
//            case "zh-Hant": //  Chinese (Traditional)
//                res.sendFile(__dirname + '/index_zhhant.html');
//                break;
            default:        // English
                res.render('index_en.ejs');            
    };
    
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

appVolatilechat.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appVolatilechat.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

io.on('connection', socket);

