module.exports = function(sg, helper){
	
	var enviaremail = function(params, callback){
		
	    let from_email = new helper.Email(params.from);
		let to_email = new helper.Email(params.to);
		let subject = params.subject;
		let content = new helper.Content("text/html", params.html);
		let mail = new helper.Mail(from_email, subject, to_email, content);

		//mail.setReplyTo(params.replyto);

		var request = sg.emptyRequest({ method: 'POST',
												path: '/v3/mail/send',
												body: mail.toJSON()});

		sg.API(request, function(error, response) {
			if (error) {console.error(error);
								return callback(false);}
			console.log(response.statusCode);
			console.log(response.body);
			console.log(response.headers);
			return callback(true);
		});
		
	};
	
	var retorno = {"enviaremail" : enviaremail};

	return retorno;	
};