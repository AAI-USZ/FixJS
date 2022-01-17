function(opt_callback) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('DOMStorage.enable', paramObject, opt_callback);
    }