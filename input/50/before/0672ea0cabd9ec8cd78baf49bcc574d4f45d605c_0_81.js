function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.hideHighlight', paramObject, opt_callback);
    }