function()	{
		try	{
			if(Private.checkStorageMethod())	{
				Webbase.StorageMode = Private.checkStorageMethod();
				return true;
			}else	{
				throw new Webbase.Exception('STR01');
			}
		}catch(err)	{
			console.log(err.message());
			return false;
		}
	}