function(path, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'path': path,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.pushNodeByPathToFrontend', paramObject, opt_callback);
    }