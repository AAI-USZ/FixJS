function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'CSS.mediaQueryResultChanged', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'CSS.styleSheetChanged', 
            ['styleSheetId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('CSS', this);
    }