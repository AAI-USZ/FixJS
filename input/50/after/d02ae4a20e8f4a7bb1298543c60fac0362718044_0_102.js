function(opt_callback/*(cssProperties)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getSupportedCSSProperties', paramObject, opt_callback);
    }