//local all the things we need
var localStrategy = require('passport-local').Strategy;

// local up the user model
var User  = require('../modulos/IRUserModel.js');

// expose this function to our app using module.exports
module.exports = function(passport)
{

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user);
  });
});    
    
// =========================================================================
// LOCAL SIGNUP - IR =======================================================
// =========================================================================
  passport.use('local-signup', new localStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField     : 'email',
      passwordField     : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },function(req, email, password, done)
        {
          process.nextTick(function()
            {User.findOne({ 'local.email' :  email }, function(err, user) 
                  {
                    // if there are any errors, return the error
                    if (err) return done(err);

                    // check to see if theres already a user with that email
                    if (user)
                      {
                        return done(null, false, req.flash('signupMessage', 'Cadastrado já existente.'));
                      }
                    else
                      {

                        var newUser            = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err)
                          {
                            if (err) throw err;
                            return done(null, newUser);
                          });
                      }
                    });
            });
        }));
    
// =========================================================================
// LOCAL ===================================================================
// =========================================================================
    passport.use('local-login', new localStrategy({
        usernameField       : 'email',
        passwordField       : 'password',
        passReqToCallback   : true
    },
    function(req, username, password, done) { // callback with email and password from our form            
        User.findOne({ 'local.email' :  username }, function(err, user) {
            if (err) {return done(err);}

            if (!user) {return done(null, false);}
            
            if (!user.validPassword(password)) {return done(null, false); }

            return done(null, user);
        });
    }));     
    
};
