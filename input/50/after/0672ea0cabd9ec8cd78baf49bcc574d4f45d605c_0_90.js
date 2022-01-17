function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.markUndoableState', paramObject, opt_callback);
    }