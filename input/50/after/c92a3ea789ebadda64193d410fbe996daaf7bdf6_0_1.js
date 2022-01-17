function (err, res) {
      if( err ) { return next( err ); }
      _self.expiry = new Date().getTime() + 23*60*60*1000;
      next();
    }