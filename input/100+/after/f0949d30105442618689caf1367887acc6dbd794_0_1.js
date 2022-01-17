function( key, json ){
			if( localStorage && JSON ){
				var now = new Date().getTime(), 
					cachedData = null;
				//retrieve
				if( json == undefined ){	
					cachedData = JSON.parse(localStorage.getItem(key));
					if( cachedData && (now - cachedData.time < options.cacheExpire) ){
						cachedData = cachedData.data;
					}else{
						cachedData = null;
					}
					return cachedData;	
				//set
				}else{		
					localStorage.setItem(key, JSON.stringify({time:now,data:json}));
				}	
			}else{
				return null;
			}		
		}