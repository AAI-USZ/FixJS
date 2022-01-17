function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.workerTerminated', 
            ['workerId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.dispatchMessageFromWorker', 
            ['workerId', 'message']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Worker.disconnectedFromWorker', 
            ['']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Worker', this);
    }