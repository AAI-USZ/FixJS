function(key){
        if(entries[key] === undefined){
	    return;
	}
	delete entries[key];
	count--;
    }