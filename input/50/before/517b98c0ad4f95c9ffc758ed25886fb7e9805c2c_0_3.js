function(tableName, data)    {
        try {
            Private.initInsert(tableName, data);
        }catch(error)    {
            console.log(error.message());
        }
    }