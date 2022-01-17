function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.redo', paramObject, opt_callback);
    }