function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.pushNodeByPathToFrontend', paramObject, opt_callback);
    }