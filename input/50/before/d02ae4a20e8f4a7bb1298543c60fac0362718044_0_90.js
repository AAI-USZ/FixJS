function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.markUndoableState', paramObject, opt_callback);
    }