function(req, res){
    var data = { title: "Tau login",
                 user: req.user,
                 message: req.flash('error')
               };
  res.render('login', data);
}