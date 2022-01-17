function(nodeId, objectGroup, opt_callback/*(object)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'objectGroup': objectGroup,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.resolveNode', paramObject, opt_callback);
    }