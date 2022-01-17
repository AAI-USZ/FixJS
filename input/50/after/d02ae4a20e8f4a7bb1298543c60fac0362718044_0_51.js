function(opt_callback) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMStorage.enable', paramObject, opt_callback);
    }