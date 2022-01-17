function(scriptId, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'scriptId': scriptId,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Debugger.searchInContent', paramObject, opt_callback);
    }