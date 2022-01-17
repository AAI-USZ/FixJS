function() {
    	var result = false;
        try {
            if(Webbase.CriteriaStruct.from.length > 0 && Private.checkTableAlreadyExists(Webbase.CriteriaStruct.from)) {
                if(Webbase.CriteriaStruct.select.length <= 0)   {
                    Webbase.CriteriaStruct.select = ['*'];    
                }
                
                var tableData = Private.getTableData(Webbase.CriteriaStruct.from);
                result = Private.find(tableData);
                
                Private.resetCriteriaStruct();

            }else   {
                Private.resetCriteriaStruct();
                throw new Webbase.Exception('CRT01');
            }        
        }catch(error)   {
            WebbaseUtility.Log.show(error.message());
        }finally	{
        	return result;
        }
    }