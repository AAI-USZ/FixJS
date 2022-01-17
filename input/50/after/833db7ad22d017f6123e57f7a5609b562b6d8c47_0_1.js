function(req, res){
  req.logout();
  req.session.destroy();
  res.json({ ok: true });
}