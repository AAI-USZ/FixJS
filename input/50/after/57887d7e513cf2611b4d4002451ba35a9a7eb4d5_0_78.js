function(objectId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'objectId': objectId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.requestNode', paramObject, opt_callback);
    }