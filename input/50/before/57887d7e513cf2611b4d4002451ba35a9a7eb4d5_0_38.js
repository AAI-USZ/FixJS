function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Network.canClearBrowserCache', paramObject, opt_callback);
    }