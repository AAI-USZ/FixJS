function(api, key, value, expireTimeSeconds, next){
		if(expireTimeSeconds < 0 || expireTimeSeconds == null){ expireTimeSeconds = defaultExpireTime; }
		var expireTimestamp = new Date().getTime();
		expireTimestamp = expireTimestamp + (expireTimeSeconds * 1000);
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