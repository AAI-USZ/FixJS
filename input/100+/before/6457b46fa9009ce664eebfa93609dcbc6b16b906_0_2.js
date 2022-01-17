function(myCache, global){

    var logger = myCache.modules.common.logger;
    var util = myCache.modules.util;
    var size = 65000,
        count = 0,
	ttl = 3600000,
	timeStampMap = {} //ts -> key
	entries = {}; //key -> value,ts
    

    var _get = function(key){
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

    var _set = function(key,val){
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
	var entry = entries[key];
	var ts = entry.timeStamp;
	delete timeStampMap[ts];
	delete entries[key];
	count--;
    }

    var _getCacheSize = function(){
	return util.getObjectSize(entries);
    }

    var _evict = function(){
	//find the element with the minimum key from timeStamp map and remove it from both maps
	//Using Object.keys may be slower than it could be ??
	var keySet = Object.keys(timeStampMap);
	var minTimeStamp = Math.min.apply( Math, keySet );
	var minKey = timeStampMap[minTimeStamp];
	delete entries[minKey];
	delete timeStampMap[minTimeStamp];
	count--;
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