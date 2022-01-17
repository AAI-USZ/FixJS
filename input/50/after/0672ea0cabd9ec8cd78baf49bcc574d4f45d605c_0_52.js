function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.disable', paramObject, opt_callback);
    }