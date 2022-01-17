function(nodeId, highlightConfig, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'highlightConfig': highlightConfig,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.highlightNode', paramObject, opt_callback);
    }