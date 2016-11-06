// Rotas de pagina tellbuzz.lenines.info

module.exports = function(app)
{
	
	app.get('/', function(req, res){
    	res.render('index.ejs');
	});
	
	// Tratamentos dos erros 404 e 500
	app.use(function(req, res, next) {
  		res.status(404).render('404.ejs');
	});
	
	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});
	
}