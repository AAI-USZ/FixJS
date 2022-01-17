function(url, opt_callback) {
        var paramObject = {
             'url': url,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('DOMDebugger.removeXHRBreakpoint', paramObject, opt_callback);
    }