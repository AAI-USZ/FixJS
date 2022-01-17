function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.removeNode', paramObject, opt_callback);
    }