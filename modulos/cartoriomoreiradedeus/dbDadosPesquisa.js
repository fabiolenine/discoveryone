module.exports = function(mongoose)
    {
    var dadospesquisaModel  = require('./modelDadosPesquisa.js');
       
    var salvar = function(dados, lat, loc, situacao, callback) {

		var newdata = new dadospesquisaModel.model({dados	: dados,
												 	situacao: situacao,
										 			loc		: {type: 'Point', coordinates:[loc,lat]}
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