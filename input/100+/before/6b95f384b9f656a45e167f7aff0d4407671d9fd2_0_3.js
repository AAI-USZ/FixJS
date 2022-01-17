function (callback) {
  var self = this
    , callback = callback || function(){};

  switch (this.readyState){
    case 0: // disconnected
      callback(null);
      break;

    case 1: // connected
      this.readyState = STATES.disconnecting;
      this.doClose(function(err){
        if (err){
          callback(err);
        } else {
          self.onClose();
          callback(null);
        }
      });
      break;

    case 2: // connecting
      this.once('open', function(){
        self.close(callback);
      });
      break;

    case 3: // disconnecting
      this.once('close', function () {
        callback(null);
      });
      break;
  }

  return this;
}