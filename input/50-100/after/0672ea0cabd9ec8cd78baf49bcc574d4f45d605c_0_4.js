function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.domContentEventFired', 
            ['timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.loadEventFired', 
            ['timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.frameNavigated', 
            ['frame']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Page.frameDetached', 
            ['frameId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Page', this);
    }