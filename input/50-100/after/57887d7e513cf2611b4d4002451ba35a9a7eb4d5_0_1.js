function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.evaluateForTestInFrontend', 
            ['testCallId', 'script']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.inspect', 
            ['object', 'hints']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.didCreateWorker', 
            ['id', 'url', 'isShared']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Inspector.didDestroyWorker', 
            ['id']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Inspector', this);
    }