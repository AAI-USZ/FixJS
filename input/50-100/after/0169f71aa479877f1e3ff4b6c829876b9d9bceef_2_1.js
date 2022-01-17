function(options, appId, target, cb) {  
    var payload = {
      payload: {
        guid: appId,
        deploytarget: target,
        action: 'list'
      }
    };
    //log.verbose(payload, 'Listing logs');

    api.doAppCall(options, "logs", payload, "Error getting logs: ", cb);
  }