function(api, key, next){
		if(api.redis.enable === true){
			api.redis.client.hget(redisCacheKey, key, function (err, cacheObj){
				cacheObj = JSON.parse(cacheObj);
				if(cacheObj != null && ( cacheObj.expireTimestamp >= new Date().getTime() || cacheObj.expireTimestamp == null )) {
					cacheObj.readAt = new Date().getTime();
					api.redis.client.hset(redisCacheKey, key, JSON.stringify(cacheObj), function(){
						if(typeof next == "function"){  
							process.nextTick(function() { next(cacheObj.value, cacheObj.expireTimestamp, cacheObj.createdAt, cacheObj.readAt); });
						}
					});
				}else{
					if(typeof next == "function"){ 
						process.nextTick(function() { next(null, null, null, null); });
					}
				}
			})
		}else{
			var cacheObj = api.cache.data[key];
			if(cacheObj == null){
				process.nextTick(function() { next(null, null, null, null); });
			}else{
				if(cacheObj.expireTimestamp >= new Date().getTime() || cacheObj.expireTimestamp == null ){
					api.cache.data[key].readAt = new Date().getTime();
					if(typeof next == "function"){  
						process.nextTick(function() { next(cacheObj.value, cacheObj.expireTimestamp, cacheObj.createdAt, cacheObj.readAt); });
					}
				}else{
					if(typeof next == "function"){ 
						process.nextTick(function() { next(null, null, null, null); });
					}
				}
			}
		}
	}