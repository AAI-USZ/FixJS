function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        chrome.devtools.remoteDebug.sendCommand('Debugger.continueToLocation', paramObject, opt_callback);
    }