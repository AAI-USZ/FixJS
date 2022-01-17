function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.redo', paramObject, opt_callback);
    }