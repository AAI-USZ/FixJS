function(result, opt_callback) {
        var paramObject = {
             'result': result,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.setShowPaintRects', paramObject, opt_callback);
    }