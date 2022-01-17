function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Network.canClearBrowserCookies', paramObject, opt_callback);
    }