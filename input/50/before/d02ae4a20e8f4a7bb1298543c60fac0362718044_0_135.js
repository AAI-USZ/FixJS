function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.devtools.remoteDebug.sendCommand('DOMDebugger.removeXHRBreakpoint', paramObject, opt_callback);
    }