function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getResourceTree', paramObject, opt_callback);
    }