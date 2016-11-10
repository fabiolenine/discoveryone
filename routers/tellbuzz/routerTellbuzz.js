// Rotas de pagina tellbuzz.lenines.info

module.exports = function(app, parserRSS)
{
	let urlList = 'http://rss.home.uol.com.br/index.xml';
	
	app.get('/', function(req, res){
    	res.render('index.ejs');
	});
	
	app.get('/about(.html)?', function(req, res){
    	res.render('about.ejs');
	});
	
	app.get('/api/v001/news', function(req, res){
		parserRSS.rssget(urlList, function(retorno){
			res.send(retorno);
		});
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