function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Runtime.isolatedContextCreated', 
            ['context']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Runtime', this);
    }