function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        chrome.devtools.remoteDebug.sendCommand('Runtime.releaseObjectGroup', paramObject, opt_callback);
    }