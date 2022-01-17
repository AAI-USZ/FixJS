function() {
        chrome.devtools.remoteDebug.registerEvent(
            'Database.addDatabase', 
            ['database']);
        chrome.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionSucceeded', 
            ['transactionId', 'columnNames', 'values']);
        chrome.devtools.remoteDebug.registerEvent(
            'Database.sqlTransactionFailed', 
            ['transactionId', 'sqlError']);
        chrome.devtools.remoteDebug.addDomainListener('Database', this);
    }