const express 			= require('express');
const bodyParser		= require('body-parser');
const http    			= require('http')
const io      			= require('socket.io')(http);
const vhost   			= require('vhost');
const sendgridAPIKEy	= require('./config/cartoriomoreiradedeus/apikeySendgrid.js');
const sendgrid			= require('sendgrid')(sendgridAPIKEy);
const sendgridEMAIL		= new sendgrid.Email();
const socket  			= require('./public/javascripts/volatilechat/socket.js');

// Roteamento de domínio e sub-domínios
const app                         = express();
const appVolatilechat             = express();
const appSequence                 = express();
const appMoreiradedeus            = express();

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
const sendgridmails			= requere('./modulos/common/sendgridEmail.js')(sendgrid, sendgridEMAIL);
const detalheemail 			= require('./modulos/cartoriomoreiradedeus/detalheEmail.js')(sendgrid, sendgridEMAIL);
//const detalheemailslenines	= require('./modulos/lenines/detalheEmails.js')(sendgridmails);


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
//require('./routers/lenines/routerLenines.js')(app, detalheemailslenines);
require('./routers/volatilechat/routerVolatilechat.js')(appVolatilechat);
require('./routers/sequence/routerSequence.js')(appSequence);
require('./routers/cartoriomoreiradedeus/routerMoreiradedeus.js')(appMoreiradedeus, detalheemail);

// Conexão com socket.io
io.on('connection', socket);