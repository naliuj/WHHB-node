// load the dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define schema for user model
var userSchema = mongoose.Schema({

    local: {
        username: String,
        password: String,
        role: Number
    }

});

// =============================================================================
// METHODS =====================================================================
// =============================================================================

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// override toJSON so that the password hash isn't returned
userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.local.password
    return obj
}

// create the model for users and expose to the app
module.exports = mongoose.model('User', userSchema);
