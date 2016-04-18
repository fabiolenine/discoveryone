// Rotas de pagina LENINES.com

module.exports = function(app)
{
	
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