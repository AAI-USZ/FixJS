function(styleSheetId, opt_callback/*(styleSheet)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getStyleSheet', paramObject, opt_callback);
    }