function(objectId, opt_callback) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.releaseObject', paramObject, opt_callback);
    }