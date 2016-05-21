// Rotas de pagina LENINES.com

module.exports = function(app,detalheemailslenines)
{

	require 
	
	app.get('/', function(req, res){
    	res.render('index.ejs');
	});
	
	app.post('/vonki/emailparasorteio', function(req, res){
        var Email               = req.body.email;
        var Loc                 = req.body.location.lng;
        var Lat                 = req.body.location.lat;
		var Situacao			= req.body.situacao;
		
        if (null == Email || Email.length < 5)
                {
                    res.send(false);
                 }
        else
        {
            detalheemailslenines.sorteiointerno(Email, Lat.toString(), Loc.toString(), Situacao, function(retorno)
            {	
				console.log('Envio de e-mail de contato interno teve sucesso? ' + retorno);
            });
			detalheemailslenines.sorteiocliente(Email, Lat.toString(), Loc.toString(), Situacao, function(retorno)
            {	
				res.send(retorno);
            });
        }	
	});
	
	app.post('/contato/email', function(req, res){
		var Nome		= req.body.nome;
        var Email       = req.body.email;
		var Mensagem	= req.body.mensagem;
        var Loc         = req.body.location.lng;
        var Lat         = req.body.location.lat;
		var Situacao	= req.body.situacao;
		
        if (null == Email || Email.length < 5)
                {
                    res.send(false);
                 }
        else
        {
            detalheemailslenines.contatointerno(Nome, Email, Mensagem, Lat.toString(), Loc.toString(), Situacao, function(retorno)
            {	
				console.log('Envio de e-mail de contato interno teve sucesso? ' + retorno);
            });
			detalheemailslenines.contatocliente(Nome, Email, Mensagem, Lat.toString(), Loc.toString(), Situacao, function(retorno)
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