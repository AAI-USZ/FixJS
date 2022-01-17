function(){
    	//var files = Object.keys(chosenItems),
    	var files,
            $trs,
            cItem,
            i, length,
            count = 0,
            reAudio=/^au/ ;
    		
        // Get visible items and check if any chosenItems are visible
        $trs = $libTable.find("tbody input:checkbox").parents("tr");
        $trs.each(function(i){
            for (cItem in chosenItems) {
                if (cItem === $(this).attr("id")) {
                    visibleChosenItems[cItem] = $(this).data('aData');
                }
            } 
        });
        
        files = Object.keys(visibleChosenItems);
    	
    	for (i = 0, length = files.length; i < length; i++) {
    		
    		if (files[i].search(reAudio) !== -1) {
    			count++;
    		}
    	}
    	
    	return count;
    }