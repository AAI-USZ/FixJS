function(key){
        if(entries[key] === undefined){
	    return;
	}
	var entry = entries[key];
	var ts = entry.timeStamp;
	delete timeStampMap[ts];
	delete entries[key];
	count--;
    }