module.exports = function(sendgrid, sendgridEMAIL){
	
	var enviaremail = function(params, callback){
		
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