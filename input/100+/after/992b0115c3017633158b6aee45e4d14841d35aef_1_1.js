function (next, sync) {
  if (_self.expired()) {
    _self.client = cloudfiles.createClient( _config );
    if(sync) {
      _self.client.authorized = true;
      _self.client.config = _client_config;
      next();
    } else {
      _self.client.setAuth( function (err, res, config) {
        if( err ) { return next( err ); }
        _client_config = config;
        _self.expiry = new Date().getTime() + 23*60*60*1000;
        next();
      });
    }
  } else {
    next();
  }
}