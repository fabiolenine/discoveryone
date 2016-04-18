// Rota do Sequence

module.exports = function(app)
{
	
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