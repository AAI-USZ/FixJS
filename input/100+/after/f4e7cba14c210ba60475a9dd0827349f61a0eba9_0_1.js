function(api, key, value, expireTimeMS, next){
		if(typeof expireTimeMS == "function" && typeof next == "undefined"){
			next = expireTimeMS;
			expireTimeMS = null;
		}
		if(expireTimeMS != null){
			var expireTimestamp = new Date().getTime() + expireTimeMS;
		}else{
			expireTimestamp = null;
		}
		var cacheObj = {
			value: value,
			expireTimestamp: expireTimestamp,
			createdAt: new Date().getTime(),
			readAt: null
		}
		if(api.redis.enable === true){
			api.redis.client.hset(redisCacheKey, key, JSON.stringify(cacheObj), function(){
				if(typeof next == "function"){ process.nextTick(function() { next(true); }); }
			});
		}else{
			try{
				api.cache.data[key] = cacheObj;
				if(typeof next == "function"){ process.nextTick(function() { next(true); }); }
			}catch(e){
				console.log(e);
				if(typeof next == "function"){  process.nextTick(function() { next(false); }); }
			}
		}
	}