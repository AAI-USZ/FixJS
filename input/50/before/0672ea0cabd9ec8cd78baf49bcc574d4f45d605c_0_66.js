function(nodeId, name, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'name': name,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.setNodeName', paramObject, opt_callback);
    }