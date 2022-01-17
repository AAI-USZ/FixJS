function() {		
		if (x3dom.DownloadManager.debugOutput) {
			x3dom.debug.logInfo('Download manager received data for URL \'' + self.url + '\', invoking callbacks.');
		}
		
		//check if object is loaded for the first time or if it has been set to dirty
		if (!x3dom.DownloadManager.loadedObjects[url]) {
			x3dom.DownloadManager.loadedObjects[url] = {arrayBuffer : self.xhr.response};
		}
	
		var i;
		for (i = 0; i < self.onloadCallbacks.length; ++i) {			
			self.onloadCallbacks[i]({arrayBuffer : x3dom.DownloadManager.loadedObjects[url].arrayBuffer,
									 url 		 : self.url});
		}
		
		--x3dom.DownloadManager.activeDownloads;
		
		x3dom.DownloadManager.removeDownload(self);
		
		x3dom.DownloadManager.tryNextDownload();
	}