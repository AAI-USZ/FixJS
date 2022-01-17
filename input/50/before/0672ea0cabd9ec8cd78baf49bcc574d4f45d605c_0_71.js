function(nodeId, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.removeAttribute', paramObject, opt_callback);
    }