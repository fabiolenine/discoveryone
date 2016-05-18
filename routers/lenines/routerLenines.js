// Rotas de pagina LENINES.com

module.exports = function(app,detalheemailsorteio)
{
	
	app.get('/', function(req, res){
    	res.render('index.ejs');
	});
	
	app.post('/vonki/emailparasorteio', function(req, res){
        var Email               = req.body.email;
        var Loc                 = req.body.location.lng;
        var Lat                 = req.body.location.lat;
		
		console.log('E-mail: ' + Email);
		console.log('Logitude: ' + Loc);
		console.log('Latitude: ' + Lat);
		
        if (null == Email || Email.length < 5)
                {
                    res.send(false);
                 }
        else
        {
            detalheemailsorteio.enviaremail(Email, Lat, Loc, function(retorno)
            {
                res.send(retorno);
            });
        }	
	});
	
	app.get('/vonki(.html)?', function(req, res){
		res.render('vonki.ejs');
	});
	
	app.get('/sitemap.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/lenines/sitemap-com.xml');
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