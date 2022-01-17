function(req, res){
  var body = req.body.memo;
  var m = new Memo();
  m.body = body;
  m.save();
  res.redirect('/');
}