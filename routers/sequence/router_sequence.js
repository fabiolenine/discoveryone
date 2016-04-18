// Rota do Sequence

module.exports = function(app)
{

// Parametrização dos caminhos estaticos public e de views
	app.use(express.static('../public/sequence'));
	app.set('view engine','ejs');
	app.set('views','../views/sequence');
	
	app.get('/', function(req, res){
    	res.send('Olá mundo!');
	});

	app.use(function(req, res, next) {
	  res.status(404).send('Sorry cant find that!');
	});

	app.use(function(err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	});
	
}