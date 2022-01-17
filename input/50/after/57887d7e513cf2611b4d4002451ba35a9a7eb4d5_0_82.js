function(frameId, contentColor, contentOutlineColor, opt_callback) {
        var paramObject = {
             'frameId': frameId,
             'contentColor': contentColor,
             'contentOutlineColor': contentOutlineColor,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOM.highlightFrame', paramObject, opt_callback);
    }