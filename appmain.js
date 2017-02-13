/*jshint esversion: 6 */

const express 			= require('express');
const app				= express();
const http    			= require('http').createServer(app);
const bodyParser		= require('body-parser');
const vhost   			= require('vhost');
const sendgridAPIKEy	= require('./config/cartoriomoreiradedeus/apikeySendgrid.js');
const sg				= require('sendgrid')(sendgridAPIKEy);
const helper			= require('sendgrid').mail;
const mongoose      	= require('mongoose');
const configmongoose	= require('./config/cartoriomoreiradedeus/configmongoose.js');

// Conexão com o mongoose
const dbPath    = "mongodb://" +    configmongoose.USER     + ":" +
                                    configmongoose.PASS     + "@"+
                                    configmongoose.HOST     + ":"+
                                    configmongoose.PORT     + "/"+
                                    configmongoose.DATABASE;

console.log('\ntentando se conectar a instância mongoDB localhost ' + configmongoose.HOST);

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

app.use(bodyParser.json());							//for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));	// for parsing application/x-www-form-urlencoded

// Parametrização dos caminhos estaticos public e de views
	app.use(express.static('public/moreiradedeus'));
	app.set('view engine','ejs');
	app.set('views','views/moreiradedeus');

app.listen(80);

//Definições dos detalhes que serão repassados as rotas para serem utilizados
const sendgridmails				= require('./modulos/common/sendgridEmail.js')(sg, helper);
const detalheemailsmd			= require('./modulos/cartoriomoreiradedeus/detalheEmails.js')(sendgridmails);
const dbcontatosite				= require('./modulos/cartoriomoreiradedeus/dbContatoSite.js')(mongoose);
const dbpesquisar				= require('./modulos/cartoriomoreiradedeus/dbPesquisar.js')(mongoose);
const dbdadospesquisa			= require('./modulos/cartoriomoreiradedeus/dbDadosPesquisa.js')(mongoose);

require('./routers/cartoriomoreiradedeus/routerMoreiradedeus.js')(app, detalheemailsmd, dbcontatosite, dbpesquisar, dbdadospesquisa);
