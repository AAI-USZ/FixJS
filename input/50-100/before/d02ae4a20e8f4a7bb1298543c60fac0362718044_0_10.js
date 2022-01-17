function() {
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.addDOMStorage', 
            ['storage']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageUpdated', 
            ['storageId']);
        chrome.devtools.remoteDebug.addDomainListener('DOMStorage', this);
    }