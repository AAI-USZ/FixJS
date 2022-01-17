function() {
	var self = this;
	this.worker = new Worker('BitComposerWorker.js');	
	this.worker.addEventListener('message', function(event){return self.messageFromWorker(event);}, false);
	
	this.refinementCallback   = {};	
	this.refinementDataURLs   = [];	
	this.nextLevelToSend  	  = 0;	
	this.refinementsToProcess = [];
	this.requestedRefinement  = {pendingRequests 	   : 0,
								 attributeArrayBuffers : []	   };
								 
	this.useDebugOutput = false;
 }