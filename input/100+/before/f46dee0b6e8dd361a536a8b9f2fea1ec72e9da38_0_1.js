function retrieveFileInfo(fileInfo, callback){
    if (fileInfo[tableProperties.FILESYSTEM_CHECKSUM] == null || typeof fileInfo[tableProperties.FILESYSTEM_CHECKSUM] == 'undefined' ||
        fileInfo[tableProperties.FILESYSTEM_TIMESTAMP == null || typeof fileInfo[tableProperties.FILESYSTEM_CHECKSUM] == 'undefined']){
        callback(null)
    }else{
        client.executeFindSingleQuery('SELECT * FROM ' + tableProperties.FILESYSTEM_TABLE + ' WHERE ' +
            tableProperties.FILESYSTEM_CHECKSUM + ' = ? AND ' + tableProperties.FILESYSTEM_TIMESTAMP + ' = ?', [fileInfo[tableProperties.FILESYSTEM_CHECKSUM,
            fileInfo[tableProperties.FILESYSTEM_TIMESTAMP]]], createFileInfoFromSingleResult, function(result){
            callback(result);
        });
    }
}