function(tableName, data) {
        var tableDetails;
        
        if(tableDetails = this.checkTableAlreadyExists(tableName))   {
            if(!this.dataFieldUnMatch(tableDetails.field, data) && !this.dataTypeUnMatch(tableDetails.field, data))	{
            	if(!this.primaryKeyMatch(tableName, tableDetails.primaryKey, data))  {
                	this.insertData(tableName, data);
            	}else	{
            		throw new Webbase.Exception('STR06');	
            	}
            }else   {
                throw new Webbase.Exception('STR04');
            }
        }else   {
            throw new Webbase.Exception('STR03');
        }
    }