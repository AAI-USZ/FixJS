function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.setXHRBreakpoint', paramObject, opt_callback);
    }