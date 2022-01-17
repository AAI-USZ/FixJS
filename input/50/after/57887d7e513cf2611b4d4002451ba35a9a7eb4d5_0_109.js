function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Timeline.eventRecorded', 
            ['record']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Timeline', this);
    }