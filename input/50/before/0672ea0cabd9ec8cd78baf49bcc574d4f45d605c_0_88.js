function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.undo', paramObject, opt_callback);
    }