function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        chrome.devtools.remoteDebug.sendCommand('Page.getCookies', paramObject, opt_callback);
    }