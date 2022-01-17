function WobbleAPI(rpc, callback) {
  if (!rpc) {
    throw new Error('RPC object is required for WobbleAPI object');
  }
  this.rpc = rpc;
  this._user = undefined;
  this.apikey = {
    'value': localStorage.getItem('WOBBLEAPI_APIKEY'),
    'get': function() {
      return this.value;
    },
    'set': function(apikey) {
      this.value = apikey;
      if (!apikey) {
        localStorage.removeItem('WOBBLEAPI_APIKEY');
      } else {
        localStorage.setItem('WOBBLEAPI_APIKEY', apikey);
      }
    }
  };

  // If we have an initial APIKEY, try to load the user with it
  if (this.apikey.get()) {
    this.refreshUser(callback);
  } else {
    // Just call the callback on next tick
    if(callback) {
      setTimeout(function() {
        callback(null);
      }, 0);
    }
  }

  // Start the notification handler
  this.notificationHandler = new NotificationHandler(this);
}