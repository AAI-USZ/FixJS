function(key){
        var entry = entries[key];
	if(entry === undefined) return null;
	if(entry != null){
	    var currTime = new Date().getTime();
	    var oldTimeStamp = timeStampMap[key];
	    if(currTime - oldTimeStamp > ttl){
	        //too old, remove it...
	        _remove(key);
	        return null;
	    }
	    //update the timeStamp
	    timeStampMap[key] = currTime;
	}
	return entry;
    }