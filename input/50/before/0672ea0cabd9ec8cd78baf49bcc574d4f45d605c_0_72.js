function(nodeId, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.getEventListenersForNode', paramObject, opt_callback);
    }