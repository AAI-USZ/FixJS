function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'ApplicationCache.applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'ApplicationCache.networkStateUpdated', 
            ['isNowOnline']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('ApplicationCache', this);
    }