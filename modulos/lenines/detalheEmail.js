module.exports = function(sendgrid, sendgridEMAIL){
	
	var enviaremail = function(nome, email, mensagem, lat, loc, situacao, callback){
		
		var params = {  to: 'fabiolenine@gmail.com',
						from:		email,
						subject:	'Sorteio de Lançamento do uso do VonKI',
						html:		'<style> header { background-color:black; color:white; text-align:center; padding:5px; } nav { line-height:30px; height:120px; width:80px; float:left; padding:5px; } section { line-height:30px; height:120px; width:auto; float:left; padding:5px; } footer { background-color:rgba(9, 97, 239, 0.88); color:white; clear:both; text-align:center; padding:5px;} mapa { text-align: center; } </style> <header> <h1> <a class="navbar-brand" href="http://www.lenines.com"> <img src="https://storage.googleapis.com/discoveryone/public/images/lenines/logo.png" alt="Logo da LENINES"> </a></h1></header><footer><h3>Dados obtidos do cliente para o sorteio</h3></footer><nav> E-mail:<br> Situação:<br> Latitude:<br> Longitude: </nav> <section> ' + email + '<br> ' + situacao + '<br> ' + lat + '<br> ' + loc + '</section> <footer> <h3>Localização do cliente quando enviou as informações</h3> </footer> <mapa> <p> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.341076875133!2d' + lat + '!3d' + loc + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMDguMyJTIDM4wrAyOCcyMy4yIlc!5e0!3m2!1spt-BR!2sbr!4v1461077812486" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe> </p> </mapa>',
						replyto:	email}; 
		
		sendgrid.send(params, function(err, json){
			if (err) {
				console.error(err);
				return callback(false);}
			console.log(json);
			return callback(true);
		});
		
	};
	
	var retorno = {"enviaremail" : enviaremail};

	return retorno;	
};