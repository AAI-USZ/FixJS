function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setDOMBreakpoint', paramObject, opt_callback);
    }