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

// Roteamentos
require('./routers/lenines/router_lenines.js')(app);
require('./routers/volatilechat/router_volatilechat.js')(appVolatilechat);
require('./routers/sequence/router_sequence.js')(appSequence);
require('./routers/cartoriomoreiradedeus/router_moreiradedeus.js')(appMoreiradedeus);

// Conexão com socket.io
io.on('connection', socket);