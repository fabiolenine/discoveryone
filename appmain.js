var express = require('express');
var http    = require('http')
var io      = require('socket.io')(http);
var vhost   = require('vhost');
var socket  = require('./public/javascripts/volatilechat/socket.js');

// Roteamento de domínio e sub-domínios
var app                         = express();
var appVolatilechat             = express();
var appSequence                 = express();
var appMoreiradedeus            = express();

app.use(vhost('www.volatilechat.com',appVolatilechat));
app.use(vhost('volatilechat.com',appVolatilechat));
app.use(vhost('sequence.lenines.com',appSequence));
app.use(vhost('www.cartoriomoreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('www.cartoriomoreiradedeus.not.br',appMoreiradedeus));
app.use(vhost('www.moreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('www.moreiradedeus.not.br',appMoreiradedeus));
app.use(vhost('cartoriomoreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('cartoriomoreiradedeus.not.br',appMoreiradedeus));
app.use(vhost('moreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('moreiradedeus.not.br',appMoreiradedeus));

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

appMoreiradedeus.use(express.static('public/moreiradedeus'));
appMoreiradedeus.set('view engine','ejs');
appMoreiradedeus.set('views','views/moreiradedeus');

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

// ------------------------------------------------------------------

appMoreiradedeus.get('/', function(req, res){
    res.render('index.ejs');
});

appMoreiradedeus.get('/servicos(.html)?', function(req, res){
    res.render('servicos.ejs');
});

appMoreiradedeus.get('/servicos/autenticacao(.html)?', function(req, res){
    res.render('servicos/autenticacao.ejs');
});

appMoreiradedeus.get('/servicos/certificadodigital(.html)?', function(req, res){
    res.render('servicos/certificadodigital.ejs');
});

appMoreiradedeus.get('/servicos/conciliacao(.html)?', function(req, res){
    res.render('servicos/conciliacao.ejs');
});

appMoreiradedeus.get('/servicos/uniaoestavel(.html)?', function(req, res){
    res.render('servicos/uniaoestavel.ejs');
});

appMoreiradedeus.get('/servicos/testamentopublico(.html)?', function(req, res){
    res.render('servicos/testamentopublico.ejs');
});

appMoreiradedeus.get('/servicos/separacaodivorcio(.html)?', function(req, res){
    res.render('servicos/separacaodivorcio.ejs');
});

appMoreiradedeus.get('/servicos/reconhecimentodefirma(.html)?', function(req, res){
    res.render('servicos/reconhecimentodefirma.ejs');
});

appMoreiradedeus.get('/servicos/procuracaopublica(.html)?', function(req, res){
    res.render('servicos/procuracaopublica.ejs');
});

appMoreiradedeus.get('/servicos/inventarioepartilha(.html)?', function(req, res){
    res.render('servicos/inventarioepartilha.ejs');
});

appMoreiradedeus.get('/servicos/atanotarial(.html)?', function(req, res){
    res.render('servicos/atanotarial.ejs');
});

appMoreiradedeus.get('/servicos/duteletronico(.html)?', function(req, res){
    res.render('servicos/duteletronico.ejs');
});

appMoreiradedeus.get('/servicos/escriturapublica(.html)?', function(req, res){
    res.render('servicos/escriturapublica.ejs');
});

appMoreiradedeus.get('/ocartorio(.html)?', function(req, res){
    res.render('ocartorio.ejs');
});

appMoreiradedeus.get('/produtos(.html)?', function(req, res){
    res.render('produtos.ejs');
});

appMoreiradedeus.get('/reputacao(.html)?', function(req, res){
    res.render('reputacao.ejs');
});

appMoreiradedeus.get('/sitemap-cartcom.xml', function(req, res){
    res.render('sitemap-cartcom.xml');
});

appMoreiradedeus.get('/sitemap-cartnot.xml', function(req, res){
    res.render('sitemap-cartnot.xml');
});

appMoreiradedeus.get('/sitemap-com.xml', function(req, res){
    res.render('sitemap-com.xml');
});

appMoreiradedeus.get('/sitemap-not.xml', function(req, res){
    res.render('sitemap-not.xml');
});

appMoreiradedeus.get('/sitemap-w3cartcom.xml', function(req, res){
    res.render('sitemap-w3cartcom.xml');
});

appMoreiradedeus.get('/sitemap-w3cartnot.xml', function(req, res){
    res.render('sitemap-w3cartnot.xml');
});

appMoreiradedeus.get('/sitemap-w3com.xml', function(req, res){
    res.render('sitemap-w3com.xml');
});

appMoreiradedeus.get('/sitemap-w3not.xml', function(req, res){
    res.render('sitemap-w3not.xml');
});
// ------------------------------------------------------------------

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

appMoreiradedeus.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

appMoreiradedeus.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

io.on('connection', socket);