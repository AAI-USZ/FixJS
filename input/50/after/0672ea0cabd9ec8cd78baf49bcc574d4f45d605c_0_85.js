function(nodeId, opt_callback/*(attributes)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getAttributes', paramObject, opt_callback);
    }