function() {
        try {
            if(Webbase.CriteriaStruct.from.length > 0) {
                if(Webbase.CriteriaStruct.select.length <= 0)   {
                    Webbase.CriteriaStruct.select = ['*'];    
                }
                
                var tableData = Private.getTableData(Webbase.CriteriaStruct.from);
                var result = Private.find(tableData);
                
                Private.resetCriteriaStruct();

                return result;
            }else   {
                Private.resetCriteriaStruct();
                throw new Webbase.Exception('CRT01');
            }        
        }catch(error)   {
            console.log(error.message());
        }
    }