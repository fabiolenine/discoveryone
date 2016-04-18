var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var iruserSchema;

// define the schema for our user model
var iruserSchema = mongoose.Schema({
                                            local       : { email       : String,
                                                            password    : String}
                                        });

// methods
// generating a hash
iruserSchema.methods.generateHash = function(password)
{   
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
iruserSchema.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('iruser', iruserSchema);
