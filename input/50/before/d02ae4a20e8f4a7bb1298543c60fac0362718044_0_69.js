function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setAttributeValue', paramObject, opt_callback);
    }