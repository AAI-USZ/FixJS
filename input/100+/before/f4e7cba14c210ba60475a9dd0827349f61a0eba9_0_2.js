function (err, cacheObj){
				cacheObj = JSON.parse(cacheObj);
				if(cacheObj != null && cacheObj.expireTimestamp >= (new Date().getTime())){
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
			}