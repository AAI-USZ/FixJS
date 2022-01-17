function(req, res){
  var data = { title: "Tau logout",
               }
  req.logout();
  res.render('logout', data);
}