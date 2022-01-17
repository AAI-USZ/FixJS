function(nodeId, text, name, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'text': text,
             'name': name,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.setAttributesAsText', paramObject, opt_callback);
    }