// Rota dos sites Cartório Moreira de Deus
module.exports = function(app,detalheemails,dbcontatosite,dbpesquisar)
{
			 
	var isCPF 	= require('../../modulos/common/quarks/isCpf.js');
	var isCNPJ	= require('../../modulos/common/quarks/isCnpj.js');
	
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	
	app.get('/pesquisar/cpf', function(req, res){
		var Cpf					= req.query.cpf;
		
		if (!isCPF(Cpf)){
			res.send('O CPF informado é invalido...');
		}
		else {
			dbpesquisar.cpf(Cpf, function(retorno){
				res.send(retorno);
			});	
		}
	});
	
	app.get('/pesquisar/cnpj', function(req, res){
		var Cnpj				= req.query.cnpj;
		
		if (!isCNPJ(Cnpj)){
			res.send('O CNPJ informado é invalido...');
		}
		else {
			dbpesquisar.cnpj(Cnpj, function(retorno){
				res.send(retorno);
			});	
		}
	});
	
	app.post('/contato/email', function(req, res){
        var Email               = req.body.email;
        var Mensagem            = req.body.mensagem;
        var Nome                = req.body.nome;
		var Assunto				= req.body.assunto;
		var Telefone			= req.body.telefone;
        var Loc                 = req.body.location.lng;
        var Lat                 = req.body.location.lat;
		var Situacao			= req.body.situacao;
		
        if (null == Email || Email.length < 5)
                {
                    res.send(false);
                 }
        else
        {
            detalheemails.contatocliente(Nome, Email, Assunto, function(retorno)
            {
                res.send(retorno);
            });
			
			detalheemails.contatointerno(Nome, Email, Assunto, Telefone, Mensagem, Lat.toString(), Loc.toString(), Situacao, function(retorno)
            {	
				console.log(retorno);
            });
			
			dbcontatosite.salvar(Nome, Email, Assunto, Telefone, Mensagem, Lat, Loc, Situacao, function(retorno) {
				console.log(retorno);
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