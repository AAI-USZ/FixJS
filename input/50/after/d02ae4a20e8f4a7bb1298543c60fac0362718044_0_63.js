function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.requestChildNodes', paramObject, opt_callback);
    }