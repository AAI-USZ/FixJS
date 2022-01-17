function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.globalObjectCleared', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.breakpointResolved', 
            ['breakpointId', 'location']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.paused', 
            ['callFrames', 'reason', 'data']);
        chrome.devtools.remoteDebug.registerEvent(
            'Debugger.resumed', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Debugger', this);
    }