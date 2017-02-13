module.exports = function(sendgridemails){
	
	var contatointerno = function(nome, email, assunto, telefone, mensagem, lat, loc, situacao, callback){
		var params = {to: 		'ola@cartoriomoreiradedeus.not.br',
					  from:		email,
					  subject:	assunto,
					  html:		'<style> header {color:white; text-align:center; padding:5px;} footer {background-color:white; color:#636363; clear:both; text-align:center; padding:5px;} </style> <header><h1><a href="http://www.cartoriomoreiradedeus.not.br"><img src="https://storage.googleapis.com/discoveryone/public/images/moreiradedeus/logoMD_192x171.png" alt="Logo do Cartório Moreira de Deus em Fortaleza"><br></a></h1></header><div>Olá,<br><br>Recebemos a seguintes mensagem enviada pelo nosso site:<br><br><strong>Nome:</strong> ' + nome + '<br><br><strong>Telefone:</strong> ' + telefone + '<br><br><strong>E-mail:</strong> ' + email + '<br><br><strong>Mensagem:</strong> ' + mensagem + '<br><br><strong>Localização:</strong><br> <br><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.341076875133!2d'+lat+'!3d'+loc+'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMDguMyJTIDM4wrAyOCcyMy4yIlc!5e0!3m2!1spt-BR!2sbr!4v1461077812486" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe><br><br>Atenciosamente,<br><br>VonKI Bot.<br></div><header><h1><a href="http://www.cartoriomoreiradedeus.not.br"><img src="https://storage.googleapis.com/discoveryone/public/images/moreiradedeus/newlogo.png" alt="Cartório Moreira de Deus em Fortaleza"></a></h1></header><footer>© CARTÓRIO MOREIRA DE DEUS 2016. TODOS OS DIREITOS RESERVADOS POR <a href="http://www.lenines.com/">LENINES</a><br>FEITO COM AMOR E POR PESSOAS CRIATIVAS.</footer>',
					  replyto:	email}; 
		
		sendgridemails.enviaremail(params,function(retorno){
			return callback(retorno);
		});
	};
	
	var contatocliente = function(nome, email, assunto, callback){
		var params = {to: 		email,
					  from:		'ola@cartoriomoreiradedeus.not.br',
					  subject:	assunto,
					  html:		'<style> header {color:white; text-align:center; padding:5px;} footer { background-color:white; color:#636363; clear:both; text-align:center; padding:5px; } </style> <header> <h1> <a href="http://www.cartoriomoreiradedeus.not.br"> <img src="https://storage.googleapis.com/discoveryone/public/images/moreiradedeus/logoMD_192x171.png" alt="Logo do Cartório Moreira de Deus em Fortaleza"><br> </a> </h1> </header> <div> Prezado(a) senhor(a) ' + nome + ',<br> <br>Agradecemos por entrar em contato.<br> <br>A sua mensagem foi distribuida e será analisada em sequência.<br> <br>Retornaremos o mais breve possível.<br> <br>Atenciosamente,<br> <br>Fatima Botelho.<br> </div> <header> <h1> <a href="http://www.cartoriomoreiradedeus.not.br"> <img src="https://storage.googleapis.com/discoveryone/public/images/moreiradedeus/newlogo.png" alt="Cartório Moreira de Deus em Fortaleza"> </a> </h1> </header> <footer> © CARTÓRIO MOREIRA DE DEUS 2016. TODOS OS DIREITOS RESERVADOS POR <a href="http://www.lenines.com/">LENINES</a><br> FEITO COM AMOR E POR PESSOAS CRIATIVAS. </footer>',
					  replyto: email};
		
		sendgridemails.enviaremail(params,function(retorno){
			return callback(retorno);
		});
	};
	
	
	var retorno = {"contatointerno" : contatointerno,
				   "contatocliente"	: contatocliente};

	return retorno;	
};