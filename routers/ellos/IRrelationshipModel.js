var mongoose = require('mongoose');
var relationshipSchema;

// define the schema for our user model
relationshipSchema = new mongoose.Schema({nome          : String,
                                        timestamp       : {type: Date, default: Date.now},
								        loc             : {type: {   type: 	String,
                                                                        enum:   ['Point']},
                                                              coordinates: 	[Number]},
                                        dataingressocar : Date,
                                        datanascimento  : Date,
                                        categoria       : String,
                                        telefones       : [{
                                                            numero      : String,
                                                            tipo        : String,
                                                            forauso     : {type: Boolean, default: false} 
                                                        }],
                                        comentarios     : [{
                                                            timestamp   : {type: Date, default: Date.now},
                                                            nome        : String,
                                                            texto       : String,
                                                            forauso     : {type: Boolean, default: false}
                                                        }],
                                        emails          : [{
                                                            email       : String,
                                                            tipo        : String,
                                                            forauso     : {type: Boolean, default: false}
                                                        }],
                                        socialnetworks  : [{
                                                            link        : String,
                                                            tipo        : String,
                                                            forauso     : {type: Boolean, default: false}
                                                        }],
                                        situacao        : String,
                                        forauso         : {type: Boolean, default: false}, 
                                        cidade          : String,
                                        estado          : String,
                                        lotacoes        : [{
                                                            datalotacao : Date,
                                                            lotacao     : String,
                                                            forauso     : {type: Boolean, default: false}
                                                        }]
                                        });

exports.model = mongoose.model('relationship', relationshipSchema);