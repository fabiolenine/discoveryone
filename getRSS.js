const express 	= require('express');
const app		= express();
const http    	= require('http').createServer(app);
const io      	= require('socket.io')(http);
const request	= require('request');
const xml2js 	= require('xml2js');
const parserRSS	= require('./modulos/tellbuzz/parserRSS.js')(request,xml2js);

var urlList = 'http://rss.home.uol.com.br/index.xml';

// Conexão com socket.io
io.listen(3000);
io.on('connection', function (socket) {
		socket.on('disconnect', function(){ });
});

var init = function() {
	parserRSS.rssget(urlList, function(retorno){
		console.log(retorno);
		io.emit('news', retorno);
	});
};

var time = setInterval(init,1000*60*5);

console.log('Begin scrapping...');