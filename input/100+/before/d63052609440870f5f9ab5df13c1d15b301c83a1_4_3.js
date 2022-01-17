function(attributeArrayBuffers) {
	//check if the next level was already downloaded
	if (this.downloadedRefinementLevels.length && this.downloadedRefinementLevels[0] === this.nextLevelToSend) {
		this.worker.postMessage({cmd : 'refine', attributeArrayBuffers : attributeArrayBuffers},
								attributeArrayBuffers);

		this.downloadedRefinementLevels.shift();
		
		this.nextLevelToSend++;
		
		if (this.requestedRefinement.pendingRequests) {
			this.requestedRefinement.pendingRequests--;
		}
		else {
			x3dom.debug.logError('BitComposer error: a refinement job was sent to the worker without being requested by the user. ' + 
								 'This can mean that the worker received invalid data due to missing ArrayBuffer ownership.');
		}
		
		if (this.useDebugOutput) {
			x3dom.debug.logInfo('Refinement request processed! ' + this.requestedRefinement.pendingRequests +
								' request(s) pending.');
		}
	}
	//postpone refinement request until the matching data was downloaded
	else if (this.nextLevelToSend < this.refinementDataURLs.length) {		
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