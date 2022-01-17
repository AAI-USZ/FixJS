function(objectId, ownProperties, opt_callback/*(result)*/) {
        var paramObject = {
             'objectId': objectId,
             'ownProperties': ownProperties,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.getProperties', paramObject, opt_callback);
    }