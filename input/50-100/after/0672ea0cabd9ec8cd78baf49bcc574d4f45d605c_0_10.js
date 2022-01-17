function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOMStorage.addDOMStorage', 
            ['storage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOMStorage.domStorageUpdated', 
            ['storageId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('DOMStorage', this);
    }