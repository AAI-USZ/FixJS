function(location, opt_callback) {
        var paramObject = {
             'location': location,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.continueToLocation', paramObject, opt_callback);
    }