function(nodeId, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setNodeValue', paramObject, opt_callback);
    }