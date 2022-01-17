function(opt_callback/*(cookies,cookiesString)*/) {
        var paramObject = {
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.getCookies', paramObject, opt_callback);
    }