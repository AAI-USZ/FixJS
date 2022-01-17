function() {
        chrome.devtools.remoteDebug.registerEvent(
            'ApplicationCache.applicationCacheStatusUpdated', 
            ['frameId', 'manifestURL', 'status']);
        chrome.devtools.remoteDebug.registerEvent(
            'ApplicationCache.networkStateUpdated', 
            ['isNowOnline']);
        chrome.devtools.remoteDebug.addDomainListener('ApplicationCache', this);
    }