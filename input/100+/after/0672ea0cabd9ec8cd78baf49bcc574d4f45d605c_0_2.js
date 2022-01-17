function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseNamesLoaded', 
            ['requestId', 'securityOriginWithDatabaseNames']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.databaseLoaded', 
            ['requestId', 'databaseWithObjectStores']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.objectStoreDataLoaded', 
            ['requestId', 'objectStoreDataEntries', 'hasMore']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'IndexedDB.indexDataLoaded', 
            ['requestId', 'indexDataEntries', 'hasMore']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('IndexedDB', this);
    }