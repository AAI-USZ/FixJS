function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getDocument', paramObject, opt_callback);
    }