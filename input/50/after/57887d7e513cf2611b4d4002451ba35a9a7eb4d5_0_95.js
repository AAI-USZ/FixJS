function(opt_callback/*(headers)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('CSS.getAllStyleSheets', paramObject, opt_callback);
    }