function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'redirectResponse']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromCache', 
            ['requestId']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.loadingFinished', 
            ['requestId', 'timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketCreated', 
            ['requestId', 'url']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketClosed', 
            ['requestId', 'timestamp']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameError', 
            ['requestId', 'timestamp', 'errorMessage']);
        chrome.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameSent', 
            ['requestId', 'timestamp', 'response']);
        chrome.devtools.remoteDebug.addDomainListener('Network', this);
    }