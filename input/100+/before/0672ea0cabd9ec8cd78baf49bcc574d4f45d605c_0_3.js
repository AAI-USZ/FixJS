function() {
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.documentUpdated', 
            ['']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.setChildNodes', 
            ['parentId', 'nodes']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.attributeModified', 
            ['nodeId', 'name', 'value']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.attributeRemoved', 
            ['nodeId', 'name']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.inlineStyleInvalidated', 
            ['nodeIds']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.characterDataModified', 
            ['nodeId', 'characterData']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeCountUpdated', 
            ['nodeId', 'childNodeCount']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeInserted', 
            ['parentNodeId', 'previousNodeId', 'node']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.childNodeRemoved', 
            ['parentNodeId', 'nodeId']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPushed', 
            ['hostId', 'root']);
        chrome.devtools.remoteDebug.registerEvent(
            'DOM.shadowRootPopped', 
            ['hostId', 'rootId']);
        chrome.devtools.remoteDebug.addDomainListener('DOM', this);
    }