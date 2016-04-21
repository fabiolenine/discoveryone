// Rota dos sites Cartório Moreira de Deus
module.exports = function(app,detalheemail)
{
			 
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	
	app.post('/sendmail', function(req, res){
		res.send(req.body);
		
        var Email               = req.body.email;
        var Mensagem            = req.body.mensagem;
        var Nome                = req.body.nome;
		var Assunto				= req.body.assunto;
        //var Loc                 = req.body.location.lng;
        //var Lat                 = req.body.location.lat;
		
        if (null == Email || Email.length < 5)
                {
                    res.send(false);
                 }
        else
        {
            detalheemail.enviaremail(Nome, Email, Assunto, Mensagem, //Lat, Loc, 
									 function(retorno)
            {
                res.send(retorno);
            });
        }	
	});
	
	app.get('/servicos(.html)?', function(req, res){
		res.render('servicos.ejs');
	});

	app.get('/servicos/autenticacao(.html)?', function(req, res){
		res.render('servicos/autenticacao.ejs');
	});

	app.get('/servicos/certificadodigital(.html)?', function(req, res){
		res.render('servicos/certificadodigital.ejs');
	});

	app.get('/servicos/conciliacao(.html)?', function(req, res){
		res.render('servicos/conciliacao.ejs');
	});

	app.get('/servicos/uniaoestavel(.html)?', function(req, res){
		res.render('servicos/uniaoestavel.ejs');
	});

	app.get('/servicos/testamentopublico(.html)?', function(req, res){
		res.render('servicos/testamentopublico.ejs');
	});

	app.get('/servicos/separacaodivorcio(.html)?', function(req, res){
		res.render('servicos/separacaodivorcio.ejs');
	});

	app.get('/servicos/reconhecimentodefirma(.html)?', function(req, res){
		res.render('servicos/reconhecimentodefirma.ejs');
	});

	app.get('/servicos/procuracaopublica(.html)?', function(req, res){
		res.render('servicos/procuracaopublica.ejs');
	});

	app.get('/servicos/inventarioepartilha(.html)?', function(req, res){
		res.render('servicos/inventarioepartilha.ejs');
	});

	app.get('/servicos/atanotarial(.html)?', function(req, res){
		res.render('servicos/atanotarial.ejs');
	});

	app.get('/servicos/duteletronico(.html)?', function(req, res){
		res.render('servicos/duteletronico.ejs');
	});

	app.get('/servicos/escriturapublica(.html)?', function(req, res){
		res.render('servicos/escriturapublica.ejs');
	});

	app.get('/ocartorio(.html)?', function(req, res){
		res.render('ocartorio.ejs');
	});

	app.get('/produtos(.html)?', function(req, res){
		res.render('produtos.ejs');
	});

	app.get('/reputacao(.html)?', function(req, res){
		res.render('reputacao.ejs');
	});

	app.get('/sitemap-cartcom.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-cartcom.xml');
	});

	app.get('/sitemap-cartnot.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-cartnot.xml');
	});

	app.get('/sitemap-com.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-com.xml');
	});

	app.get('/sitemap-not.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-not.xml');
	});

	app.get('/sitemap-w3cartcom.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-w3cartcom.xml');
	});

	app.get('/sitemap-w3cartnot.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-w3cartnot.xml');
	});

	app.get('/sitemap-w3com.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-w3com.xml');
	});

	app.get('/sitemap-w3not.xml', function(req, res){
		res.download('/home/fabiolenine_gmail_com/discoveryone/views/moreiradedeus/sitemap-w3not.xml');
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