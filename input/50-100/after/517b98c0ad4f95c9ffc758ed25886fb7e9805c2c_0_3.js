function(tableName,desc,primaryKey)	{
		if(Webbase.StorageMode)	{
			this.getTableDetails();
			if(!this.checkTableAlreadyExists(tableName))	{
				this.setTableDetails(tableName,desc,primaryKey);
				this.createTable(tableName);
			}else	{
				throw new Webbase.Exception('STR02');
			}
		}else	{
			throw new Webbase.Exception('STR01');
		}
	}