function(lineNumber, url, urlRegex, columnNumber, condition, opt_callback/*(breakpointId,locations)*/) {
        var paramObject = {
             'lineNumber': lineNumber,
             'url': url,
             'urlRegex': urlRegex,
             'columnNumber': columnNumber,
             'condition': condition,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.setBreakpointByUrl', paramObject, opt_callback);
    }