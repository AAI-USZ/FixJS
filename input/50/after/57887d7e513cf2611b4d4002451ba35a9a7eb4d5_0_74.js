function(nodeId, outerHTML, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'outerHTML': outerHTML,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setOuterHTML', paramObject, opt_callback);
    }