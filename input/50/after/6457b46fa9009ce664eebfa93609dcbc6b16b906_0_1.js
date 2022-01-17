function(key){
        if(entries[key] === undefined){
	    return;
	}
	delete timeStampMap[key];
	delete entries[key];
	count--;
    }