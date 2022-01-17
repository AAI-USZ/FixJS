function(nodeId, highlightConfig, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'highlightConfig': highlightConfig,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.highlightNode', paramObject, opt_callback);
    }