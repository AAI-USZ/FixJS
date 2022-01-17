function(){
	    			$.post("command/rdf-extension/addService",
	    					{"datasource":"sparql","name":name,"url":endpoint,"type":type,"graph":graph_uri,properties:prop_uris},
	    					function(data){
	    						self._dismissBusy();
	    						RdfReconciliationManager.registerService(data,self._level);					
	    					},"json");
			}