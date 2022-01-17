function(tableName, desc, primaryKey)	{
		Webbase.TableDesc.push({
			name : tableName,
			field : desc,
			primaryKey : primaryKey
		});
		Webbase.StorageMode.setItem('Webbase_tbl', WebbaseUtility.JSON.stringify(Webbase.TableDesc));
	}