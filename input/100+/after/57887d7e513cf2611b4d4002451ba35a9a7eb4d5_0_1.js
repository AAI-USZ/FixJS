function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestWillBeSent', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'request', 'timestamp', 'initiator', 'redirectResponse']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromCache', 
            ['requestId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.responseReceived', 
            ['requestId', 'frameId', 'loaderId', 'timestamp', 'type', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.dataReceived', 
            ['requestId', 'timestamp', 'dataLength', 'encodedDataLength']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.loadingFinished', 
            ['requestId', 'timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.loadingFailed', 
            ['requestId', 'timestamp', 'errorText', 'canceled']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.requestServedFromMemoryCache', 
            ['requestId', 'frameId', 'loaderId', 'documentURL', 'timestamp', 'initiator', 'resource']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketWillSendHandshakeRequest', 
            ['requestId', 'timestamp', 'request']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketHandshakeResponseReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketCreated', 
            ['requestId', 'url']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketClosed', 
            ['requestId', 'timestamp']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameReceived', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameError', 
            ['requestId', 'timestamp', 'errorMessage']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Network.webSocketFrameSent', 
            ['requestId', 'timestamp', 'response']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Network', this);
    }