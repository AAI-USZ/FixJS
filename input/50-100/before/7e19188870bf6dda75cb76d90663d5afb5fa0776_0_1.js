function(key,val){
        //TODO : add LRU and timout logic

        var item = function(val){
	    this.value = val;
	    this.timeStamp = new Date().getTime();
	}

        if(entries[key] === undefined){
	    count++;
	}
	var theItem = new item(val);
	entries[key]=theItem;
	//add in entry in timeStampMap
	timeStampMap[theItem.timeStamp] = key;

	var currCacheSize = _getCacheSize();
	if(_getCacheSize() > size){
	    _evict();
	}
    }