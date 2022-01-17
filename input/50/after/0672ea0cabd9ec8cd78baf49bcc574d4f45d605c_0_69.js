function(nodeId, name, value, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
             'value': value,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setAttributeValue', paramObject, opt_callback);
    }