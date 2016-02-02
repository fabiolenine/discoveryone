/**
 * app.js
 *
 * @version 0.1 - Beta
 *
 * DESCRIPTION:
 * Serviço WEB do aplicativo influenced.
 * Webserver and a mongo DB on separate instances on Cloud Google.
 * Uses the Express and Mongoose node packages.
 *
 *
 * @algumacoisa
 * @see algumacoisa.com
 * @see algumacoisa.com.br
 *
 * @author Fabio Lenine Vilela da Silva
 * (C) 2015 Fortaleza - Brasil
 */

var http                = require('http');
var https               = require('https');
var mongoose            = require('mongoose');
var express             = require('express');
var passport            = require('passport');
var nodemailer          = require('nodemailer');
var sesTransport        = require('nodemailer-ses-transport');
var cons                = require('consolidate');
var flash               = require('connect-flash');
var morgan              = require('morgan');
var cookieParser        = require('cookie-parser');
var bodyParser          = require('body-parser');
var session             = require('express-session');
var vhost               = require('vhost');
var request             = require('request');
var cheerio             = require('cheerio');
var MemoryStore         = require('connect').session;

var app                 = express();

http.createServer(app).listen(80);

var dbPath  = 'mongodb://localhost/influencedb';

var db;              // our MongoDb database

var IRDetalhes  = require('./modulos/IRDetalhes.js')(mongoose);

var ObjectID 		= mongoose.Types.ObjectId;

// ------------------------------------------------------------------------
// Connect to our Mongo Database hosted on another server
//
console.log('\ntentando se conectar a instância MongoDB remoto em outro servidor Cloud Google');

if ( !(db = mongoose.connect(dbPath)) ) console.log('Não é possível conectar ao MongoDB em '+dbPath);
else console.log('conexão com o MongoDB em '+dbPath);

// connection failed event handler
mongoose.connection.on('erro: ', function(err)
        {
        console.log('Conexão da base de dados com erro '+err);
        }); // mongoose.connection.on()

// connection successful event handler:
// check if the Db already contains a greeting. if not, create one and save it to the Db
mongoose.connection.once('open', function()
        {
        console.log('database está agora aberto.' );
        });

//---------------------------------------------------------------------------------------


// set up ejs for templating
app.set('view engine','ejs');

// set up our express application
app.use(morgan('dev'));     //log every request to the console
app.use(cookieParser());    // read cookies (need for auth)
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'jacagueiprontoagoravamosfudersuaputa', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());                                                // use connect-flash for flash messages stored in session

// routes
require('./config/passport')(passport);                                     // pass passport for configuration
require('./modulos/routesir.js')(app, passport, mongoose, IRDetalhes);      // load our routes and pass in our app and fully configured passport


//
// Express route to handle errors
//
app.use(function(err, req, res, next)
        {
        if (req.xhr)
                {
                res.send(500, 'Algo deu errado Sam!');
                res.end;
                }
        else
                {
                next(err);
                }
        });

// ------------------------------------------------------------------------
// Start Express Webserver
//
console.log('Iniciando o Web server Influenced');
console.log('Webserver está escutando na port 80.');