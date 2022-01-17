function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Timeline.eventRecorded', 
            ['record']);
        chrome.devtools.remoteDebug.addDomainListener('Timeline', this);
    }