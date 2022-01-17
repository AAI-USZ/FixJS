function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.globalObjectCleared', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.scriptParsed', 
            ['scriptId', 'url', 'startLine', 'startColumn', 'endLine', 'endColumn', 'isContentScript', 'sourceMapURL']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.scriptFailedToParse', 
            ['url', 'scriptSource', 'startLine', 'errorLine', 'errorMessage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.breakpointResolved', 
            ['breakpointId', 'location']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.paused', 
            ['callFrames', 'reason', 'data']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Debugger.resumed', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Debugger', this);
    }