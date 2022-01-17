function(workerScriptfile) {

	var self = this;
	
  this.worker = new Worker( new x3dom.BitLODWorker().toBlob() );	
  
  this.worker.postMessage = this.worker.webkitPostMessage || this.worker.postMessage;
  
	this.worker.addEventListener('message', function(event){return self.messageFromWorker(event);}, false);
	
	this.refinementCallback  = {};
								 
	this.useDebugOutput = false;  
 }