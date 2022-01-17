function(databaseId, opt_callback/*(tableNames)*/) {
        var paramObject = {
             'databaseId': databaseId,
         };
        chrome.experimental.devtools.remoteDebug.sendCommand('Database.getDatabaseTableNames', paramObject, opt_callback);
    }