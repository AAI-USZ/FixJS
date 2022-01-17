function(text, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'text': text,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.searchInResources', paramObject, opt_callback);
    }