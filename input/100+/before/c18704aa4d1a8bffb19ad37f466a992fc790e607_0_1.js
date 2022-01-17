function(){
    	var files = Object.keys(chosenItems),
    		i, length,
    		count = 0,
    		reAudio=/^au/ ;
    	
    	for (i = 0, length = files.length; i < length; i++) {
    		
    		if (files[i].search(reAudio) !== -1) {
    			count++;
    		}
    	}
    	
    	return count;
    }