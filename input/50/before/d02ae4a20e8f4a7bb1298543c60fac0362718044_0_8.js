function(identifier, opt_callback) {
        var paramObject = {
             'identifier': identifier,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.removeScriptToEvaluateOnLoad', paramObject, opt_callback);
    }