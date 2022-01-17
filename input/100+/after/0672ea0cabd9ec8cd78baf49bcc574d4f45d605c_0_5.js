function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.addProfileHeader', 
            ['header']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.addHeapSnapshotChunk', 
            ['uid', 'chunk']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.finishHeapSnapshot', 
            ['uid']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.setRecordingProfile', 
            ['isProfiling']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.resetProfiles', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Profiler.reportHeapSnapshotProgress', 
            ['done', 'total']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Profiler', this);
    }