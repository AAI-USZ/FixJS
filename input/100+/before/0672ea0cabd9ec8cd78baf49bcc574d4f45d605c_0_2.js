function() {
        chrome.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseNamesLoaded', 
            ['requestId', 'securityOriginWithDatabaseNames']);
        chrome.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseLoaded', 
            ['requestId', 'databaseWithObjectStores']);
        chrome.devtools.remoteDebug.registerEvent(
            'IndexedDB.objectStoreDataLoaded', 
            ['requestId', 'objectStoreDataEntries', 'hasMore']);
        chrome.devtools.remoteDebug.registerEvent(
            'IndexedDB.indexDataLoaded', 
            ['requestId', 'indexDataEntries', 'hasMore']);
        chrome.devtools.remoteDebug.addDomainListener('IndexedDB', this);
    }