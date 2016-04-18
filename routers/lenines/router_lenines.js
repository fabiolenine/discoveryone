// Rotas de pagina LENINES.com

module.exports = function(app)
{

// Parametrização dos caminhos estaticos public e de views
	app.use(express.static('../public/lenines'));
	app.set('view engine','ejs');
	app.set('views','../views/lenines');
	
	app.get('/', function(req, res){
    	res.render('index.ejs');
	});
	
	app.use(function(req, res, next) {
	  res.status(404).render('Sorry cant find that!');
	});

	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});
	
}