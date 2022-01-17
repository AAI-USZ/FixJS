function(cookieName, domain, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'domain': domain,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.deleteCookie', paramObject, opt_callback);
    }