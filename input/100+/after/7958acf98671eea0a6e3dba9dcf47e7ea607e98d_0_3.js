function(data) {
	var i;

	if (data.arrayBuffer) {
		//find level of the returned data
		for (i = 0; i < this.refinementDataURLs.length; ++i) {
			if (data.url === this.refinementDataURLs[i]) {
				break;
			}
		}

		if (i < this.refinementDataURLs.length) {
			if (this.useDebugOutput) {
				x3dom.debug.logInfo('Refinement level ' + i + ' has been loaded!');
			}
			
			this.worker.postMessage({cmd 		 : 'transferRefinementData',
									 level		 : i,
									 arrayBuffer : data.arrayBuffer},
									[data.arrayBuffer]);

			this.downloadedRefinementLevels.push(i);
			this.downloadedRefinementLevels.sort(function(a, b) { return a - b; });
			
			//if there is a pendingRequests request for refinement, try to process it
		    if (this.requestedRefinement.pendingRequests) {
				this.refine_private(this.requestedRefinement.attributeArrayBuffers);
			}
		}
		else {
			x3dom.logError('Error when enqueueing refinement data: no level with the given URL could be found.');
		}
	}
	else {
		x3dom.debug.logError('Unable to use downloaded refinement data: no ArrayBuffer data recognized.');
	}
 }