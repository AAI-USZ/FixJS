function(userAgent, opt_callback) {
        var paramObject = {
             'userAgent': userAgent,
         };
        chrome.devtools.remoteDebug.sendCommand('Network.setUserAgentOverride', paramObject, opt_callback);
    }