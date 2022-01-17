function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.canClearBrowserCache', paramObject, opt_callback);
    }