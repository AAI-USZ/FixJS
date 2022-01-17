function(key){
        var entry = entries[key];
	if(entry === undefined){
	    return null;
	}

	if(entry != null){
	    var currTime = new Date().getTime();
	    var oldTimeStamp = entry.timeStamp;
	    if(currTime - oldTimeStamp > ttl){
	        //too old, remove it...
	        _remove(key);
	        return null;
	    }
	    //update the timeStamp in all the maps
	    entry.timeStamp = currTime;
	    entries[key] = entry;
	    //update timeStampMap with the new timestamp as the key
	    delete timeStampMap[oldTimeStamp];
	    timeStampMap[currTime] = entry.key;
	}
	return entry.value;
    }