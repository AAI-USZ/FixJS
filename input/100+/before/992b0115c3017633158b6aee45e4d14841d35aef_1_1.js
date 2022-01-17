function (next) {
  if (_self.expired()) {
    _self.client = cloudfiles.createClient( _config );

    _self.client.setAuth( function (err) {
      if( err ) { return next( err ); }

      _self.expiry = new Date().getTime() + 23*60*60*1000;
      next();
    })  
  } else {
    next();
  }
}