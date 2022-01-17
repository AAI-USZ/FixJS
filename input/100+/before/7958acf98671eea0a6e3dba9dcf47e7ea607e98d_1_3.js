function(url, onloadCallback, priority) {
	if (!url) {
		x3dom.debug.logError('No URL specified.');		
	}
	else if (!onloadCallback) {
		x3dom.debug.logError('No onload callback specified. Ignoring request for \"' +
							 url + '\"');
	} else {	
		var p = 0;
		
		//if a priority is given then take it,
		//otherwise assume 0
		if (priority) {
			p = priority;
		}
		
		var r = new Request(url, onloadCallback, p);
		
		//enqueue request priority-based
		this.insertRequest(r);
		
		if (x3dom.DownloadManager.debugOutput) {
			x3dom.debug.logInfo('Download manager received request for URL \'' + url + '\'.');
		}
	}
}