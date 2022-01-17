function(attributeArrayBuffers) {	
	//check if the next level was already downloaded
	if (this.refinementsToProcess.length && this.refinementsToProcess[0] === this.nextLevelToSend) {
		this.worker.postMessage({cmd : 'refine', attributeArrayBuffers : attributeArrayBuffers},
								attributeArrayBuffers);

		this.refinementsToProcess.shift();
		
		this.nextLevelToSend++;
		
		if (this.requestedRefinement.pendingRequests) {
			this.requestedRefinement.pendingRequests--;
		}
		
		if (this.useDebugOutput) {
			x3dom.debug.logInfo('Refinement request processed! ' + this.requestedRefinement.pendingRequests +
								' request(s) pending.');
		}
	}
	//postpone refinement request until the matching data was downloaded
	else if (this.nextLevelToSend < this.refinementDataURLs.length) {
		this.requestedRefinement.pendingRequests++;
		this.requestedRefinement.attributeArrayBuffers = attributeArrayBuffers;
		
		if (this.useDebugOutput) {
			x3dom.debug.logInfo('Refinement request postponed. '  + this.requestedRefinement.pendingRequests +
								' request(s) pending.');
		}
	}
	//no refinements left - we're done!
	else {
		if (this.useDebugOutput) {
			x3dom.debug.logInfo('No refinements left to process!');
		}
	}
 }