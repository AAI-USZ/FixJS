function(err, conString) {
    if(err) {
      return cb ? cb(err) : self.emit('error', err);
    }
    nativeConnect.call(self, conString);
    if(cb) {
      var errCallback;
      var connectCallback = function() {
        //remove single-fire connection error callback
        self.removeListener('error', errCallback);
        cb(null);
      }
      errCallback = function(err) {
        //remove singel-fire connection success callback
        self.removeListener('connect', connectCallback);
        cb(err);
      }
      self.once('connect', connectCallback);
      self.once('error', errCallback);
    }
  }