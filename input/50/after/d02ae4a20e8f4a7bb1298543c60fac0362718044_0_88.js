function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.undo', paramObject, opt_callback);
    }