function(opt_callback/*(domGroups,strings)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Memory.getDOMNodeCount', paramObject, opt_callback);
    }