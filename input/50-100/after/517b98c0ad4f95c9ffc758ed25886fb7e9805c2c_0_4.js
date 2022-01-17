function(tableName, desc, primaryKey)	{
		if(desc.hasOwnProperty(primaryKey) || primaryKey == '')	{
			Webbase.TableDesc.push({
				name : tableName,
				field : desc,
				primaryKey : primaryKey
			});
			Webbase.StorageMode.setItem('Webbase_tbl', WebbaseUtility.JSON.stringify(Webbase.TableDesc));
		}else	{
			throw new Webbase.Exception('STR05');
		}
	}