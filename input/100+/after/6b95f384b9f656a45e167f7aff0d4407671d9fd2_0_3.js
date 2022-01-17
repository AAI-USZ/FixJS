function (callback) {
  var self = this;

  switch (this.readyState){
    case 0: // disconnected
      callback && callback();
      break;

    case 1: // connected
      this.readyState = STATES.disconnecting;
      this.doClose(function(err){
        if (err){
          self.error(err, callback);
        } else {
          self.onClose();
          callback && callback();
        }
      });
      break;

    case 2: // connecting
      this.once('open', function(){
        self.close(callback);
      });
      break;

    case 3: // disconnecting
      if (!callback) break;
      this.once('close', function () {
        callback();
      });
      break;
  }

  return this;
}