function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.disable', paramObject, opt_callback);
    }