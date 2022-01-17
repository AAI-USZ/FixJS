function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getSupportedCSSProperties', paramObject, opt_callback);
    }