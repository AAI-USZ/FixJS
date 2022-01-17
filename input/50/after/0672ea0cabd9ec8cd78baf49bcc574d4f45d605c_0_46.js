function(databaseId, query, opt_callback/*(success,transactionId)*/) {
        var paramObject = {
             'databaseId': databaseId,
             'query': query,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.executeSQL', paramObject, opt_callback);
    }