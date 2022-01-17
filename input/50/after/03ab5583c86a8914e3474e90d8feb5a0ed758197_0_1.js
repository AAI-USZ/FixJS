function(){
  var addr = app.address();
  logger.info("%s started on %s:%s", pkgInfo.name, addr.address, addr.port);
}