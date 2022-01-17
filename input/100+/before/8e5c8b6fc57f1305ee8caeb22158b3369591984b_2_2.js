function(entity, success, error, options) {
        	
        	console.log("createEntity receives arguments:")
        	console.log(entity)
        	console.log(success)
        	console.log(error)
        	console.log(options)
        	
    			options = (options)? options :  {};

    			var connector = this;
    	
    	    	connector._iterate({
    	        	method : connector._createEntity,
    	        	methodNode : connector._createEntityNode,
    	        
    	        	url : function (idx, opts) {
    	        		
    	                var update = options.update;
    	                
    	                var u = this.options.url[idx].replace(/\/$/, '') + this.options.entityhub.urlPostfix;
    	                
    	                u += "/entity";
    	                
    	                if (update) {
    	                	u += "?update=true";
    	                }
    	        		return u;
    	        	},
    	        	
    	        	args : {
    	        		entity : entity,
    	        		format : "application/rdf+xml"
    	        	},
    	        	success : success,
    	        	error : error,
    	        	urlIndex : 0
    	        });
    	    }