module.exports = function(sendgrid, sendgridEMAIL){
	
	var enviaremail = function(email, lat, loc, situacao, callback){
		
		console.log('-------detalhes---------');
		console.log('Loc: ' + loc.toString());
		console.log('Lat: ' + lat.toString());
		console.log('Situacao: ' + situacao);
		console.log('E-mail: ' + email);
		console.log('------------------------');
		
		var params = {to: 		'fabiolenine@gmail.com',
					  from:		email,
					  subject:	'Sorteio de Lançamento do uso do VonKI',
					  html:		'<h3><strong>E-mail: ' + email + '</strong><h3><br><h3>Situação: ' + situacao + '</h3><br><h3>Latitude: ' + lat.toString() + '</h3><br><h3>Longitude: ' + loc.toString() + '</h3><br><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.341076875133!2d' + lat.toString.substring(0,10) + '!3d' + loc.toString().substring(0,10) + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMDguMyJTIDM4wrAyOCcyMy4yIlc!5e0!3m2!1spt-BR!2sbr!4v1461077812486" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>',
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