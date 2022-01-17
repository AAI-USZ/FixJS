function (req, res, next){
  var context = null;
  var host = req.header('Host');

  console.log(host);

  if(host.indexOf("docs") > -1) { context = "docs"; }
  else if(host.indexOf("developer") > -1) { context = "developer"; }

  res.local("context", context);
  next();
}