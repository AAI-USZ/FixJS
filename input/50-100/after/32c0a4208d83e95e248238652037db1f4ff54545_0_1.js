function(workerScriptfile) {
	var self = this;
	
	this.worker = new Worker(workerScriptfile ? workerScriptfile : 'BitComposerWorker.js');		
  
  this.worker.postMessage = this.worker.webkitPostMessage || this.worker.postMessage;
  
	this.worker.addEventListener('message', function(event){return self.messageFromWorker(event);}, false);
	
	this.refinementCallback  = {};
								 
	this.useDebugOutput = false;  
 }