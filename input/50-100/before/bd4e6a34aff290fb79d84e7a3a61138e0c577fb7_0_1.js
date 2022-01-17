function (req, res, next){
  var context = null;
  var referrer = req.header('Referrer');

  if(referrer.indexOf("docs") > 0) { context = "docs"; }
  else if(referrer.indexOf("developer") > 0) { context = "developer"; }

  res.local("context", context);
  next();
}