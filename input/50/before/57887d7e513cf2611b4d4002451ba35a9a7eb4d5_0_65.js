function(nodeId, selector, opt_callback/*(nodeIds)*/) {
        var paramObject = {
             'nodeId': nodeId,
             'selector': selector,
         };
        chrome.devtools.remoteDebug.sendCommand('DOM.querySelectorAll', paramObject, opt_callback);
    }