function(nodeId, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Console.addInspectedNode', paramObject, opt_callback);
    }