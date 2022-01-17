function(req, res){
      // TODO figure out what this is?
      var data = { 
        title: "Tau logout",
        message: 'Good Bye!'
      };
      req.flash('error', "You've loged out,  Goodbye!'")
      req.logout();
      res.render('auth/login', data);
  }