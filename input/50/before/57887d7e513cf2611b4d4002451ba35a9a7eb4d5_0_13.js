function(opt_callback/*(frameTree)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getResourceTree', paramObject, opt_callback);
    }