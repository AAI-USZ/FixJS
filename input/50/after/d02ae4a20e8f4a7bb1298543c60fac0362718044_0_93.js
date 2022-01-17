function(nodeId, opt_callback/*(inlineStyle,attributesStyle)*/) {
        var paramObject = {
             'nodeId': nodeId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getInlineStylesForNode', paramObject, opt_callback);
    }