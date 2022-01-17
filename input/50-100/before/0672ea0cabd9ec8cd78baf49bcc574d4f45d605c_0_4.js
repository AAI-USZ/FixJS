function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Page.domContentEventFired', 
            ['timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.loadEventFired', 
            ['timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameNavigated', 
            ['frame']);
        chrome.devtools.remoteDebug.registerEvent(
            'Page.frameDetached', 
            ['frameId']);
        chrome.devtools.remoteDebug.addDomainListener('Page', this);
    }