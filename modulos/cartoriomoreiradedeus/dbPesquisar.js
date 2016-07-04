module.exports = function(mongoose)
    {
	
	var  searchclienteModel = require('./modelSearchCliente.js');
       
    var cpf = function(CPF, callback) {
        var search = searchclienteModel.model.find({cpfcnpj: CPF},function(err, result) {
            if (err) {
                console.error('Erro: ' + err);
                callback('Houve algum problema, informação não encontrada.');
            }
            else {
            	callback(result);
			};
        });   			
    };

   var retorno = {  "cpf"    : cpf};
   
   return retorno;     
 	};