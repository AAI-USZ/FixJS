function(error, result){
    			if ((error || !(result && result == '')) && query != id && query[instance.service.primaryKey]&&(query[instance.service.primaryKey].length == 12||query[instance.service.primaryKey].length == 24)){
    				try{
    					instance.details({_id:simpleportal.db.getObjectId(query[instance.service.primaryKey])}, callback, options);
    				}catch(error){
    					callback(error);
    				}
    			}else if (!result || result == '') 
                    callback("There is no result found for the id " + id);
    			else
    				instance.service.beforeDetailsCallback(error, result, callback);	
    	    }