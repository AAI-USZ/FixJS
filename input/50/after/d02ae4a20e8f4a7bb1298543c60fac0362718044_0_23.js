function(objectGroup, opt_callback) {
        var paramObject = {
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Runtime.releaseObjectGroup', paramObject, opt_callback);
    }