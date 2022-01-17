function(options, appId, logName, target, cb) {  
    var payload = {
      payload: {
        guid: appId,
        deploytarget: target,
        action: 'delete',
        logname: logName
      }
    };
    log.verbose(payload, 'Deleting log');

    api.doAppCall(options, "logs", payload, "Error deleting log: ", cb);
  }