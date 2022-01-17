function(opt_callback/*(domGroups,strings)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Memory.getDOMNodeCount', paramObject, opt_callback);
    }