module.exports = function(mongoose)
    {
	
	var  searchclienteModel = require('./modelSearchCliente.js');
       
    var cpf = function(CPF, callback) {
        var search = searchclienteModel.model.findOne({cpfcnpj: CPF, situacao: {$ne: "Bloqueado no SAN"}},function(err, result) {
            if (err) {
                console.error('Erro: ' + err);
                callback('Houve algum problema, informação não encontrada.');
            }
            else {
            	callback(result);
			};
        });   			
    };

    var cnpj = function(CNPJ, callback) {
        var search = searchclienteModel.model.findOne({cpfcnpj: CNPJ, situacao: {$ne: "Bloqueado no SAN"}},function(err, result) {
            if (err) {
                console.error('Erro: ' + err);
                callback('Houve algum problema, informação não encontrada.');
            }
            else {
            	callback(result);
			};
        });   			
    };	
	
   var retorno = {  "cpf"   : cpf,
				 	"cnpj"	: cnpj};
   
   return retorno;     
 	};