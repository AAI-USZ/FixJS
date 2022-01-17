function(cookieName, domain, opt_callback) {
        var paramObject = {
             'cookieName': cookieName,
             'domain': domain,
         };
        chrome.devtools.remoteDebug.sendCommand('Page.deleteCookie', paramObject, opt_callback);
    }