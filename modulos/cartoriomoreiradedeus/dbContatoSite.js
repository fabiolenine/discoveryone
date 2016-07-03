'use strict';

module.exports = function(mongoose)
    {
    const contatositeModel  = require('./modelContatoSite.js');
       
    var salvar = function(nome, email, assunto, telefone, mensagem, lat, loc, situacao, callback) {

		let newdata = new contatositeModel.model({	nome,
												 	telefone,
                                            		assunto,
                                            		email,
                                            		mensagem,
										 			situacao,
										 			loc			: {type: 'Point', coordinates:[Lon,Lat]}
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