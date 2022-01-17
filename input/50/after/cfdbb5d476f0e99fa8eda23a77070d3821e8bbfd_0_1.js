function(req, res){
  var body = req.body.memo;
  var m = new Memo({body: body});
  m.save();
  res.redirect('/');
}