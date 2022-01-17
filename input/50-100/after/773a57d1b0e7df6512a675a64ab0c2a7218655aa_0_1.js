function checkState() {
    if (released) {
      var msg;
      if (error !== null) {
        var reason;
        if (typeof wrapper.getErrorMsg === 'function')
          reason = wrapper.getErrorMsg(error);
        else
          reason = error.toString();
        msg = 'Connection is broken due to an error: ' + reason;
      }
      else 
        msg = 'Connection is no longer available';
      throw new Error(msg);
    }
  }