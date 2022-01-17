function() {
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.addDatabase', 
            ['database']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionSucceeded', 
            ['transactionId', 'columnNames', 'values']);
        chrome.experimental.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionFailed', 
            ['transactionId', 'sqlError']);
        chrome.experimental.devtools.remoteDebug.addDomainListener('Database', this);
    }