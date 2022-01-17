function(frameId, url, query, caseSensitive, isRegex, opt_callback/*(result)*/) {
        var paramObject = {
             'frameId': frameId,
             'url': url,
             'query': query,
             'caseSensitive': caseSensitive,
             'isRegex': isRegex,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Page.searchInResource', paramObject, opt_callback);
    }