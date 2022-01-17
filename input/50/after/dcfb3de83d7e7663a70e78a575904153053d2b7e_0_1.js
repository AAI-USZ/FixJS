function(req, res){
      var data = { 
        title: "Tau logout",
        message: 'Good Bye!'
      };
      // TODO figure out what this is?
      //req.flash('error', "Goodbye!")
      req.logout();
      res.render('auth/login', data);
  }