function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.inspect', 
            ['object', 'hints']);
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.didCreateWorker', 
            ['id', 'url', 'isShared']);
        chrome.devtools.remoteDebug.registerEvent(
            'Inspector.didDestroyWorker', 
            ['id']);
        chrome.devtools.remoteDebug.addDomainListener('Inspector', this);
    }