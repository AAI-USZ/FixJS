function(key,val){
        //TODO : add LRU and timout logic
        if(entries[key] === undefined){
	    count++;
	}
	entries[key]=val;
    }