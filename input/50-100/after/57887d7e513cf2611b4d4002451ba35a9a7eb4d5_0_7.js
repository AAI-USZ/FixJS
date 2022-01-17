function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messageAdded', 
            ['message']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messageRepeatCountUpdated', 
            ['count']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Console.messagesCleared', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Console', this);
    }