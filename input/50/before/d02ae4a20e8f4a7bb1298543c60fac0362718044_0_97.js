function(styleSheetId, opt_callback/*(text)*/) {
        var paramObject = {
             'styleSheetId': styleSheetId,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getStyleSheetText', paramObject, opt_callback);
    }