var express 		= require('express');
var bodyParser		= require('body-parser');
var http    		= require('http')
var io      		= require('socket.io')(http);
var vhost   		= require('vhost');
var sendgridAPIKEy	= require('./config/cartoriomoreiradedeus/apikey_sendgrid.js');
var sendgrid		= require('sendgrid')(sendgridAPIKEy);
var	sendgridEMAIL	= new sendgrid.Email();
//var nodemailer		= require('nodemailer');
//var smtpTransport 	= require('nodemailer-smtp-transport');
var socket  		= require('./public/javascripts/volatilechat/socket.js');

// Roteamento de domínio e sub-domínios
var app                         = express();
var appVolatilechat             = express();
var appSequence                 = express();
var appMoreiradedeus            = express();

app.use(bodyParser.json());							//for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));	// for parsing application/x-www-form-urlencoded

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

//Definições dos detalhes que serão repassados as rotas para serem utilizados
var detalheemail = require('./modulos/cartoriomoreiradedeus/detalhe_email.js')(sendgrid, sendgridEMAIL);

// Parametrização dos caminhos estaticos public e de views
	appMoreiradedeus.use(express.static('public/moreiradedeus'));
	appMoreiradedeus.set('view engine','ejs');
	appMoreiradedeus.set('views','views/moreiradedeus');

// Parametrização dos caminhos estaticos public e de views
	app.use(express.static('public/lenines'));
	app.set('view engine','ejs');
	app.set('views','views/lenines');

// Parametrização dos caminhos estaticos public e de views
	appSequence.use(express.static('public/sequence'));
	appSequence.set('view engine','ejs');
	appSequence.set('views','views/sequence');

// Parametrização dos caminhos estaticos public e de views
	appVolatilechat.use(express.static('public/volatilechat'));
	appVolatilechat.set('view engine','ejs');
	appVolatilechat.set('views','views/volatilechat');

// Roteamentos
require('./routers/lenines/router_lenines.js')(app);
require('./routers/volatilechat/router_volatilechat.js')(appVolatilechat);
require('./routers/sequence/router_sequence.js')(appSequence);
require('./routers/cartoriomoreiradedeus/router_moreiradedeus.js')(appMoreiradedeus,detalheemail);

// Conexão com socket.io
io.on('connection', socket);