var mongoose = require('mongoose');
var dadosPesquisaSchema;

dadosPesquisaSchema = new mongoose.Schema({ dados		: String,
                                            timestamp	: {type:Date, default: Date.now},
                                            situacao	: String,
										 	loc			: {	type			: {	type		: 	String,
                                                                				enum		:   ['Point']},
                                                         	coordinates	: 	[Number]}
                                       });

exports.model = mongoose.model('dadospesquisa',dadosPesquisaSchema);