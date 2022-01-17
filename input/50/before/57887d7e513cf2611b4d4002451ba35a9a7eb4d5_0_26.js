function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Runtime.isolatedContextCreated', 
            ['context']);
        chrome.devtools.remoteDebug.addDomainListener('Runtime', this);
    }