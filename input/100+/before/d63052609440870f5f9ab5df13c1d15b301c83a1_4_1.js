function() {
	var self = this;
	
	this.worker = new Worker( new x3dom.BitLODWorker().toBlob() );	
	this.worker.addEventListener('message', function(event){return self.messageFromWorker(event);}, false);
	
	this.refinementCallback   		= {};	
	this.refinementDataURLs   		= [];	
	this.nextLevelToSend  	  		= 0;	
	this.downloadedRefinementLevels = [];
	
	this.requestedRefinement  		= {pendingRequests 	   : 0,
									   attributeArrayBuffers : []	   };
								 
	this.useDebugOutput = false;  
 }