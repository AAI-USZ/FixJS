function(nodeId, targetNodeId, insertBeforeNodeId, opt_callback/*(nodeId)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'targetNodeId': targetNodeId,
             'insertBeforeNodeId': insertBeforeNodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.moveTo', paramObject, opt_callback);
    }