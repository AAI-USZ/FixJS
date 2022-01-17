function(url, onloadCallback, priority) {
	if (!url) {
		x3dom.debug.logError('No URL specified.');		
	}
	else if (!onloadCallback) {
		x3dom.debug.logError('No onload callback specified. Ignoring request for \"' +
							 url + '\"');
	} else {
		if (x3dom.DownloadManager.debugOutput) {
			x3dom.debug.logInfo('Download manager accepted request for URL \'' + url + '\'.');
		}
		//if the data has already been downloaded has not been set to dirty, return it
		if (x3dom.DownloadManager.loadedObjects[url]) {
			if (x3dom.DownloadManager.debugOutput) {
				x3dom.debug.logInfo('Download returns previously stored data for URL \'' + url + '\', invoking callback.');
			}
		
			onloadCallback({arrayBuffer : this.loadedObjects[url].arrayBuffer,
							url			: url});
		}
		//enqueue request priority-based or append callback to a matching active request
		else {
			//check if there is already an enqueued or sent request for the given url
			var i, j;
			var found = false;

			for (i = 0; i < this.requests.length && !found; ++i) {	
				if (this.requests[i]){			
					for (j = 0; j < this.requests[i].length; ++j) {
						if (this.requests[i][j].url === url) {							
							this.requests[i][j].onloadCallbacks.push(onloadCallback);
							if (x3dom.DownloadManager.debugOutput) {
								x3dom.debug.logInfo('Download manager appended onload callback for URL \'' + url +
													'\' to a running request using the same URL.');
							}
							
							found = true;
							break;
						}
					}
				}
			}
		
			if (!found) {
				var p = 0;
				
				//if a priority is given then take it, otherwise assume 0
				if (priority) {
					p = priority;
				}
				
				var r = new Request(url, onloadCallback, p);
				
				this.insertRequest(r);
			}
		}
	}
}