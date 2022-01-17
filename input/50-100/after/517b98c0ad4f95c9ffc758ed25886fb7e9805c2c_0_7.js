function()	{
    	try{
    		if(Webbase.CriteriaStruct.from.length > 0 && Private.checkTableAlreadyExists(Webbase.CriteriaStruct.from))	{
    			Private.update(Private.getTableData(Webbase.CriteriaStruct.from));
    			Private.resetCriteriaStruct();
    		}else	{
    			Private.resetCriteriaStruct();
    			throw new Webbase.Exception('CRT01');
    		}
    	}catch(error)	{
    		WebbaseUtility.Log.show(error.message());
    	}
    }