function() {
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.mediaQueryResultChanged', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'CSS.styleSheetChanged', 
            ['styleSheetId']);
        chrome.devtools.remoteDebug.addDomainListener('CSS', this);
    }