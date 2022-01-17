function (appId, logName, target, cb) {  
    var payload = {
      payload: {
        guid: appId, 
        deploytarget: target, 
        logname: logName, 
        action: 'get'
      }
    };

    log.verbose(payload, 'Getting logs');
    api.doAppCall(options, "logs", payload, "", cb);
  }