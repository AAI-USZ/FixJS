function(tableName, desc, primaryKey)	{
		if(!primaryKey)	{
			primaryKey = '';
		}

		try	{
			Private.initCreate(tableName, desc, primaryKey);
		}catch(err)	{
			WebbaseUtility.Log.show(err.message());
		}
	}