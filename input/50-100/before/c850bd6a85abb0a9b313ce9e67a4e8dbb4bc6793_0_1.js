function() {
	var self = this;
	this.worker = new Worker('BitComposerWorker.js');	
	this.worker.addEventListener('message', function(event){return self.messageFromWorker(event);}, false);
	
	this.refinementCallback = {};
 }