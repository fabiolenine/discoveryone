const express 			= require('express');
const bodyParser		= require('body-parser');
const http    			= require('http')
const io      			= require('socket.io')(http);
const vhost   			= require('vhost');
const sendgridAPIKEy	= require('./config/cartoriomoreiradedeus/apikeySendgrid.js');
const sendgrid			= require('sendgrid')(sendgridAPIKEy);
const sendgridEMAIL		= new sendgrid.Email();
const socket  			= require('./public/javascripts/volatilechat/socket.js');
const mongoose      	= require('mongoose');
const configmongoose	= require('./config/cartoriomoreiradedeus/configmongoose.js');

// Conexão com o mongoose

const dbPath    = "mongodb://" +    configmongoose.USER     + ":" +
                                    configmongoose.PASS     + "@"+
                                    configmongoose.HOST     + ":"+
                                    configmongoose.PORT     + "/"+
                                    configmongoose.DATABASE;

console.log('\ntentando se conectar a instância mongoDB localhost ' + config.HOST);

const db = mongoose.connect(dbPath);
if ( !(db) ) console.log('Não é possível conectar ao mongoDB em '+dbPath);
else console.log('conexão com o mongoDB em '+dbPath);

// connection failed event handler
mongoose.connection.on('erro: ', function(err)
        {
        console.log('conexão da base de dados com erro '+err);
        }); // mongoose.connection.on()

// connection successful event handler:
// check if the db already contains a greeting. if not, create one and save it to the db
mongoose.connection.once('open', function() 
        {
        console.log('database '+configmongoose.DATABASE+' está agora aberto em '+configmongoose.HOST );
        });


// Roteamento de domínio e sub-domínios
const app                         = express();
const appVolatilechat             = express();
const appSequence                 = express();
const appMoreiradedeus            = express();
//const appMDAPPS					  = express();

app.use(bodyParser.json());							//for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));	// for parsing application/x-www-form-urlencoded

app.use(vhost('www.volatilechat.com',appVolatilechat));
app.use(vhost('volatilechat.com',appVolatilechat));
app.use(vhost('sequence.lenines.com',appSequence));
app.use(vhost('www.cartoriomoreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('www.cartoriomoreiradedeus.not.br',appMoreiradedeus));
app.use(vhost('www.moreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('www.moreiradedeus.not.br',appMoreiradedeus));	
//app.use(vhost('apps.cartoriomoreiradedeus.not.br',appMDAPPS));
app.use(vhost('cartoriomoreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('cartoriomoreiradedeus.not.br',appMoreiradedeus));
app.use(vhost('moreiradedeus.com.br',appMoreiradedeus));
app.use(vhost('moreiradedeus.not.br',appMoreiradedeus));

app.listen(80); 

//https.createServer(options, app).listen(443);

//Definições dos detalhes que serão repassados as rotas para serem utilizados
const sendgridmails				= require('./modulos/common/sendgridEmail.js')(sendgrid, sendgridEMAIL);
const detalheemailsmd			= require('./modulos/cartoriomoreiradedeus/detalheEmails.js')(sendgridmails);
const dbcontatosite				= require('./modulos/cartoriomoreiradedeus/dbContatoSite.js')(mongoose);
const dbpesquisar				= require('./modulos/cartoriomoreiradedeus/dbPesquisar.js')(mongoose);
const detalheemailslenines		= require('./modulos/lenines/detalheEmails.js')(sendgridmails);


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
require('./routers/lenines/routerLenines.js')(app, detalheemailslenines);
require('./routers/volatilechat/routerVolatilechat.js')(appVolatilechat);
require('./routers/sequence/routerSequence.js')(appSequence);
require('./routers/cartoriomoreiradedeus/routerMoreiradedeus.js')(appMoreiradedeus, detalheemailsmd, dbcontatosite, dbpesquisar);

// Conexão com socket.io
io.on('connection', socket);