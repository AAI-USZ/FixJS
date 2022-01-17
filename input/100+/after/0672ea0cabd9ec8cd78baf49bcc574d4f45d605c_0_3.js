function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.documentUpdated', 
            ['']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.setChildNodes', 
            ['parentId', 'nodes']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.attributeModified', 
            ['nodeId', 'name', 'value']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.attributeRemoved', 
            ['nodeId', 'name']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.inlineStyleInvalidated', 
            ['nodeIds']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.characterDataModified', 
            ['nodeId', 'characterData']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPushed', 
            ['hostId', 'root']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPopped', 
            ['hostId', 'rootId']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('DOM', this);
    }