function(tableName, data)    {
        try {
            Private.initInsert(tableName, data);
        }catch(error)    {
            WebbaseUtility.Log.show(error.message());
        }
    }