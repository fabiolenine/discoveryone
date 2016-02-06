//routesir.js
module.exports = function(app, passport, mongoose, IRDetalhes) 
{
    app.set('views', '../InfluencedRelationship');
    
// =====================================
// HOME PAGE (with login links) ========
// =====================================
  
// =====================================
// LOGIN ===============================
// =====================================
// show the login form  
    app.get('/', function(req, res) {
        res.render('index.ejs', {   //isAuthenticated: false,
                                    message: req.flash('loginMessage') }); // load the index.ejs file
    });
    
    // process the login form
app.post('/login', passport.authenticate('local-login', {
	successRedirect   : '/dashboard',     // redirect to the secure profile section
	failureRedirect   : '/accessdenied',  // redirect back to the signup page if there is an error
	failureFlash      : true              // allow flash messages
}));

// =====================================
// DashBoard SECTION ====================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
//  app.get('/dashboard', isLoggedIn, function(req, res) {
//    res.render('dashboard.ejs', {
//      user : req.user // get the user out of session and pass to template
//    });
//  });
    
app.get('/dashboard', isLoggedIn, function(req, res) {
    res.render('dashboard.ejs',{
        user :  req.user          
    });
});

// =====================================
// Relationship SECTION ====================
// =====================================    
app.get('/relationshiptables', isLoggedIn, function(req, res) {
    res.render('relationshiptables.ejs', {
      user : req.user // get the user out of session and pass to template
    });
});

app.get('/relationship/list', function(req, res) {
      IRDetalhes.listar(req.body, function(success){
        res.send(success);
      });
});

app.post('/relationship/addtelefone', function(req, res) {
      IRDetalhes.addtelefone(req.body, function(success){
        res.send(success);
      });
});
    
app.post('/relationship/addemail', function(req, res) {
      IRDetalhes.addemail(req.body, function(success){
        res.send(success);
      });
});

app.post('/relationship/addlotacao', function(req, res) {
      IRDetalhes.addlotacao(req.body, function(success){
        res.send(success);
      });
});

app.post('/relationship/addsocialnetwork', function(req, res) {
      IRDetalhes.addsocialnetwork(req.body, function(success){
        res.send(success);
      });
});

app.post('/relationship/addcomentario', function(req, res) {
      IRDetalhes.addcomentario(req.body, function(success){
        res.send(success);
      });
});
    
app.post('/relationship/salvar', function(req, res) {   
      IRDetalhes.salvar(req.body, function(success){
        res.json(success);
      });
});
    
// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
app.get('/signup', isLoggedIn, function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});
    
    // process the signup form
app.post('/signup', passport.authenticate('local-signup', {
		successRedirect   : '/dashboard', // redirect to the secure profile section
		failureRedirect   : '/signup',    // redirect back to the signup page if there is an error
		failureFlash      : true          // allow flash messages
	}));
    
// =====================================
// LOGOUT ==============================
// =====================================
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

app.get('/accessdenied', function(req,res){
        res.render('accessdenied.ejs');
        });  

app.get('/ping', function(req,res){
    res.status(200).send("pong!");
});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {return next();}

  // if they aren't redirect them to the home page
  res.redirect('/accessdenied');
};