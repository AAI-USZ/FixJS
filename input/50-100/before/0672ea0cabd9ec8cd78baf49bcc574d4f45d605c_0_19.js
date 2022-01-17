function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.workerCreated', 
            ['workerId', 'url', 'inspectorConnected']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.workerTerminated', 
            ['workerId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.dispatchMessageFromWorker', 
            ['workerId', 'message']);
        chrome.devtools.remoteDebug.registerEvent(
            'Worker.disconnectedFromWorker', 
            ['']);
        chrome.devtools.remoteDebug.addDomainListener('Worker', this);
    }