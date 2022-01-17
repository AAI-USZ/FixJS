function(nodeId, opt_callback/*(listeners)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.getEventListenersForNode', paramObject, opt_callback);
    }