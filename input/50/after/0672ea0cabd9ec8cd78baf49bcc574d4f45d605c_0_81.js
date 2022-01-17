function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.hideHighlight', paramObject, opt_callback);
    }