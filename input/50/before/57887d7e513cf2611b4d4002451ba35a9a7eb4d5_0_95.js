function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('CSS.getAllStyleSheets', paramObject, opt_callback);
    }