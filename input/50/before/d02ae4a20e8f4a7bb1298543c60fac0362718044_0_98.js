function(styleSheetId, text, opt_callback) {
        var paramObject = {
             'styleSheetId': styleSheetId,
             'text': text,
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.setStyleSheetText', paramObject, opt_callback);
    }