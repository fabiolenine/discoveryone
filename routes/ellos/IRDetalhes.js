//IRDetalhes.js
module.exports = function(mongoose)
{
	var relationshipmodel      = require('./IRrelationshipModel.js');

    var ObjectID 	  = mongoose.Types.ObjectId;
            
	//chamar o model e acima fazer um require;

    var listar = function(data, callback){
        relationshipmodel.model.find(function(err, doc){
            if(err){
                console.log('Erro na busca dos relacionamentos');
            }
            else {
                callback(doc);
            }
        });
    };
            
    var addemail = function(data, callback){ 
        var condition   = { _id: new ObjectID(data._id)};
        var vdatas = { emails: {  tipo    : data.emails.tipo,
                                  email   : data.emails.email,
                                  forauso : data.emails.forauso}}; 
        
        relationshipmodel.model.update(condition,{ $push: vdatas},{upsert:false},function updateCallback(err) {
            if(err){callback(false); }
            else { callback(data); }
        });    
    };   
    
    var addtelefone = function(data, callback){ 
        var condition   = { _id: new ObjectID(data._id)};
        var vdatas = { telefones: { tipo    : data.telefones.tipo,
                                    numero   : data.telefones.numero,
                                    forauso : data.telefones.forauso}}; 
        
        relationshipmodel.model.update(condition,{ $push: vdatas},{upsert:false},function updateCallback(err) {
            if(err){callback(false); }
            else { callback(data); }
        });    
    };
    
    var addlotacao = function(data, callback){ 
        var condition   = { _id: new ObjectID(data._id)};
        var vdatas = { lotacoes: {  datalotacao : new date(data.lotacoes.datalotacao),
                                    lotacao     : data.lotacoes.lotacao,
                                    forauso     : data.lotacoes.forauso}}; 
        
        relationshipmodel.model.update(condition,{ $push: vdatas},{upsert:false},function updateCallback(err) {
            if(err){callback(false); }
            else { callback(data); }
        });    
    };
    
    var addsocialnetwork = function(data, callback){ 
        var condition   = { _id: new ObjectID(data._id)};
        var vdatas = { socialnetworks: {tipo    : data.socialnetworks.tipo,
                                        link   : data.socialnetworks.link,
                                        forauso : data.socialnetworks.forauso}}; 
        
        relationshipmodel.model.update(condition,{ $push: vdatas},{upsert:false},function updateCallback(err) {
            if(err){callback(false); }
            else { callback(data); }
        });    
    };

    var addcomentario = function(data, callback){ 
        var condition   = { _id: new ObjectID(data._id)};
        var vdatas = { comentarios: {nome    : data.comentarios.nome,
                                     texto   : data.comentarios.texto,
                                     forauso : data.comentarios.forauso}};

        relationshipmodel.model.update(condition,{ $push: vdatas},{upsert:false},function updateCallback(err) {
            if(err){callback(false); }
            else { callback(data); }
        });    
    };
    
    var salvar = function(data, callback){ 
        var vdata       = new relationshipmodel.model(data);
        var condition   = {_id: new ObjectID(data._id)};
        if(!data._id){
            vdata.save(function(err, doc){
                if(err){
                    callback(err);
                }
                else {
                    callback(doc);
                }
            });
        }
        else {
                        
//            if(vdata.razaosocial           === undefined){vdata.razaosocial           = '';}
//            if(vdata.cnpj                  === undefined){vdata.cnpj                  = '';}
//            if(vdata.inscricaoestadual     === undefined){vdata.inscricaoestadual     = '';}
//            if(vdata.inscricaomunicipal    === undefined){vdata.inscricaomunicipal    = '';}
//            if(vdata.cep                   === undefined){vdata.cep                   = '';}
//            if(vdata.website               === undefined){vdata.website               = '';}
//            if(vdata.situacao              === undefined){vdata.situacao              = '';}
            
//            var vdatasid = {    nomefantasia       : vdata.nomefantasia,
//                                nomeresponsavel    : vdata.nomeresponsavel,
//                                nomecontato        : vdata.nomecontato,
//                                cargo              : vdata.cargo,
//                                setor              : vdata.setor,
//                                razaosocial        : vdata.razaosocial,
//                                cnpj               : vdata.cnpj,
//                                inscricaoestadual  : vdata.inscricaoestadual,
//                                inscricaomunicipal : vdata.inscricaomunicipal,
//                                logradouro         : vdata.logradouro,
//                                complemento        : vdata.complemento,
//                                bairro             : vdata.bairro,
//                                cidade             : vdata.cidade,
//                                estado             : vdata.estado,
//                                cep                : vdata.cep,
//                                email              : vdata.email,
//                                telefone           : vdata.telefone,
//                                website            : vdata.website,
//                                forauso            : vdata.forauso,
//                                situacao           : vdata.situacao
//                           }; 
               
            relationshipmodel.model.update(condition,{ $set: vdatasid},{upsert:false},function updateCallback(err) {
						if(err){
							console.log('Atualização do data falhou, ID: ' + vdata._id);
                            console.log(err);
							callback(false);
						}
						else {
							console.log('Sucesso ao atualizar o ID: ' + vdata._id);
							callback(data);
						}
            });    
        }
    };
    
    var retorno = {"listar"             : listar,
                   "addemail"           : addemail,
                   "addtelefone"        : addtelefone,
                   "addlotacao"         : addlotacao,
                   "addsocialnetwork"   : addsocialnetwork,
                   "addcomentario"      : addcomentario,
                   "salvar"             : salvar};

	return retorno;	    
}