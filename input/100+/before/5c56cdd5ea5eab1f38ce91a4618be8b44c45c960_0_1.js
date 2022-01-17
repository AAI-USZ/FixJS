function(myCache, global){

    var logger = myCache.modules.common.logger;
    var size = 20,
        count = 0,
	ttl = 3600,
	entries = [];
    
    var _get = function(key){
       logger.log('inside _get key = '+key);
       return entries[key];
    }

    var _set = function(key,val){
        //TODO : add LRU and timout logic
       var msg = 'inside _set key = '+key+' val = '+val;
       logger.log(msg);
       entries[key]=val;
       count++;
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
	delete entries[key];
	count++;
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
	getTtl : _getTtl,
	setTtl : _setTtl,
	getSize : _getSize,
	setSize : _setSize
    }
    return _;

}