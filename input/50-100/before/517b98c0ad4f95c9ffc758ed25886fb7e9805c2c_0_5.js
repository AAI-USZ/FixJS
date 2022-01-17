function(tableName, desc)	{
		try	{
			Private.initCreate(tableName, desc);
		}catch(err)	{
			console.log(err.message());
		}
	}