module.exports = function(nodemailer, smtpTransport){

	var accountmail = require('/home/fabiolenine_gmail_com/discoveryone/config/cartoriomoreiradedeus/accountmail.js');
	
	var enviaremail = function(nome, email, assunto, mensagem, 
						    	//lat, loc
							   callback){
	
		var mailOptions = {
			from: 		nome + '<' + email + '>', 													// sender address
			to: 		'fabiolenine@gmail.com',	// list of receivers
			subject:	assunto, 														   			// Subject line
			text: 		mensagem //,																// plaintext body
			//html: 	mensagem + '<br><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.341076875133!2d'+lat+'!3d'+loc+'!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM8KwNDQnMDguMyJTIDM4wrAyOCcyMy4yIlc!5e0!3m2!1spt-BR!2sbr!4v1461077812486" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>'
		};

		var transporter = nodemailer.createTransport(smtpTransport(accountmail));
		
		console.log(accountmail);
		console.log(transporter);
		
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
				return callback(false);
			}
			console.log('Message sent: ' + info.response);
			return callback(true);
		});
		
	};
	
	var retorno = {"enviaremail" : enviaremail};

	return retorno;	
};