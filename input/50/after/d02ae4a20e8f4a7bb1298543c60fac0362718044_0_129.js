function(nodeId, type, opt_callback) {
        var paramObject = {
             'nodeId': nodeId,
             'type': type,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeDOMBreakpoint', paramObject, opt_callback);
    }