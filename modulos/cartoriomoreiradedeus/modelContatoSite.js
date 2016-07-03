var mongoose = require('mongoose');
var contatoSiteSchema;

contatoSiteSchema = new mongoose.Schema({ 	nome                    : String,
                                            telefone	            : String,
                                            assunto                 : String,
                                            email                   : String,
                                            timestamp	            : {type:Date, default: Date.now},
                                            mensagem			    : String,
										 	situacao				: String,
										 	loc						: {type			: {	type		: 	String,
                                                               							enum		:   ['Point']},
                                                         				coordinates	: 	[Number]}
                                       });

exports.model = mongoose.model('contatosite',contatoSiteSchema);