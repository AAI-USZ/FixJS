function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.addProfileHeader', 
            ['header']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.finishHeapSnapshot', 
            ['uid']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.setRecordingProfile', 
            ['isProfiling']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.resetProfiles', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'Profiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
        chrome.devtools.remoteDebug.addDomainListener('Profiler', this);
    }