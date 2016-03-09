var express = require('express');
var http    = require('http')
var io      = require('socket.io')(http);
var vhost   = require('vhost');
var socket  = require('./public/javascripts/volatilechat/socket.js');

// Roteamento de domínio e sub-domínios
var app                         = express();
var appVolatilechat             = express();
var appSequence                 = express();
var appCartoriomoreiradedeusNot = express();
var appCartoriomoreiradedeusCom = express();
var appMoreiradedeusNot         = express();
var appMoreiradedeusCom         = express();

app.use(vhost('www.volatilechat.com',appVolatilechat));
app.use(vhost('volatilechat.com',appVolatilechat));
app.use(vhost('sequence.lenines.com',appSequence));
app.use(vhost('www.cartoriomoreiradedeus.com.br',appCartoriomoreiradedeusCom));
app.use(vhost('www.cartoriomoreiradedeus.not.br',appCartoriomoreiradedeusNot));
app.use(vhost('www.moreiradedeus.not.br',appMoreiradedeusNot));
app.use(vhost('www.moreiradedeus.com.br',appMoreiradedeusCom));
app.use(vhost('cartoriomoreiradedeus.com.br',appCartoriomoreiradedeusCom));
app.use(vhost('cartoriomoreiradedeus.not.br',appCartoriomoreiradedeusNot));
app.use(vhost('moreiradedeus.not.br',appMoreiradedeusNot));
app.use(vhost('moreiradedeus.com.br',appMoreiradedeusCom));

app.listen(80); 

//https.createServer(options, app).listen(443);

// Parametrização dos caminhos estaticos public e de views
app.use(express.static('public/lenines'));
app.set('view engine','ejs');
app.set('views','views/lenines');

appVolatilechat.use(express.static('public/volatilechat'));
appVolatilechat.set('view engine','ejs');
appVolatilechat.set('views','views/volatilechat');

appSequence.use(express.static('public/sequence'));
appSequence.set('view engine','ejs');
appSequence.set('views','views/sequence');

appCartoriomoreiradedeusCom.use(express.static('public/moreiradedeus'));
appCartoriomoreiradedeusCom.set('view engine','ejs');
appCartoriomoreiradedeusCom.set('views','views/moreiradedeus');

appCartoriomoreiradedeusNot.use(express.static('public/moreiradedeus'));
appCartoriomoreiradedeusNot.set('view engine','ejs');
appCartoriomoreiradedeusNot.set('views','views/moreiradedeus');

appMoreiradedeusNot.use(express.static('public/moreiradedeus'));
appMoreiradedeusNot.set('view engine','ejs');
appMoreiradedeusNot.set('views','views/moreiradedeus');

appMoreiradedeusCom.use(express.static('public/moreiradedeus'));
appMoreiradedeusCom.set('view engine','ejs');
appMoreiradedeusCom.set('views','views/moreiradedeus');

// Roteamento do Rest
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

appSequence.get('/', function(req, res){
    res.send('Olá mundo!');
});

appCartoriomoreiradedeusCom.get('/', function(req, res){ 
    res.render('index.ejs');
});

appCartoriomoreiradedeusNot.get('/', function(req, res){
    res.render('index.ejs');
});

appMoreiradedeusNot.get('/', function(req, res){
    res.render('index.ejs');
});

appMoreiradedeusCom.get('/', function(req, res){
    res.render('index.ejs');
});

appMoreiradedeusCom.get('/servicos(.html)?', function(req, res){
    res.render('servicos.ejs');
});

appMoreiradedeusCom.get('/servicos/autenticacao(.html)?', function(req, res){
    res.render('servicos/autenticacao.ejs');
});

app.use(function(req, res, next) {
  res.status(404).render('Sorry cant find that!');
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

appSequence.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appSequence.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

appCartoriomoreiradedeusCom.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appCartoriomoreiradedeusCom.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

appCartoriomoreiradedeusNot.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appCartoriomoreiradedeusNot.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

appMoreiradedeusNot.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appMoreiradedeusCom.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appMoreiradedeusNot.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

appMoreiradedeusCom.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

io.on('connection', socket);