function(myCache, global){

    var logger = myCache.modules.common.logger;
    var util = myCache.modules.util;
    var size = 65000,
        count = 0,
	ttl = 3600000,
	timeStampMap = {} //key -> ts
	entries = {}; //key -> value
    

    var _get = function(key){
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

    var _set = function(key,val){
        //TODO : add LRU and timout logic
        if(entries[key] === undefined){
	    count++;
	}
	entries[key]=val;
	//add in entry in timeStampMap
	var currentTime = new Date().getTime();
	timeStampMap[key] = currentTime;

	var currCacheSize = _getCacheSize();
	if(currCacheSize > size){
	    _evict();
	}
    }

    var _getCount = function(){
	return count;
    }
    var _setSize = function(val){
	size = val;
    }
    var _getSize = function(){
	return size;
    }

    var _setTtl = function(val){
	ttl = val;
    }
    var _getTtl = function(){
	return ttl;
    }

    var _remove = function(key){
        if(entries[key] === undefined){
	    return;
	}
	delete timeStampMap[key];
	delete entries[key];
	count--;
    }

    var _getCacheSize = function(){
	return util.getObjectSize(entries);
    }

    var _evict = function(){
	//find the element with the minimum key from timeStamp map and remove it from both maps
	var minKey = _findElemWithMinTs();
	if(minKey !== undefined){
	    delete entries[minKey];
	    delete timeStampMap[minKey];
	    count--;
	}
    }

    //this is kinda lame, but it works,
    //takes O(n) time, but happens only in eviction
    var _findElemWithMinTs = function(){
	var minTs=Number.MAX_VALUE, 
	    itsKey;
	for(var i in timeStampMap){
	    var ts = timeStampMap[i];
	    if(ts < minTs) {
		minTs = ts;
		itsKey = i;
	    }
	}
	return itsKey;
    }

    //the only reason for using function to export is to able to set TTL 
    //and SIZE(maximum capacity of the cache) of the cache during construction
    var _=function(arg){
	if(arg && arg.TTL){
	    ttl = arg.TTL;
	}
	if(arg && arg.SIZE){
	    size = arg.SIZE;
	}
    
    };
    _.prototype = {
        constructor : MYCACHE.modules.cache.lru,
	version : "0.1.0",
        get : _get,
	set : _set,
	remove : _remove,
	getCount : _getCount,
	getTtl : _getTtl,
	setTtl : _setTtl,
	getSize : _getSize,
	setSize : _setSize
    }
    return _;

}