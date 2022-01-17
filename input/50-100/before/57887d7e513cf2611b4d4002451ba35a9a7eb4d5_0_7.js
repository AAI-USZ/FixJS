function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messageAdded', 
            ['message']);
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messageRepeatCountUpdated', 
            ['count']);
        chrome.devtools.remoteDebug.registerEvent(
            'Console.messagesCleared', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Console', this);
    }