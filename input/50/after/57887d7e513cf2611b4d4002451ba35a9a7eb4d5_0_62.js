function(opt_callback/*(root)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getDocument', paramObject, opt_callback);
    }