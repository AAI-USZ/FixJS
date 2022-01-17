function(opt_callback/*(result)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.canOverrideDeviceMetrics', paramObject, opt_callback);
    }