module.exports = function(mongoose)
    {
    var contatositeModel  = require('./modelContatoSite.js');
       
    var salvar = function(nome, email, assunto, telefone, mensagem, lat, loc, situacao, callback) {

		var newdata = new contatositeModel.model({	nome	: nome,
												 	telefone: telefone,
                                            		assunto	: assunto,
                                            		email	: email,
                                            		mensagem: mensagem,
										 			situacao: situacao,
										 			loc		: {type: 'Point', coordinates:[Loc,Lat]}
												 });
		
        newdata.save(function(err, result) {                                             
        	if (err) {
                     	console.error('Erro: ' + err);
                        callback(err);
                     } 
            else     {
                        callback('Sucesso ao salvar os dados de contato do site...');
                     }
                                  			});
 
    };

   var retorno = {  "salvar"    : salvar};
   
   return retorno;     
    }