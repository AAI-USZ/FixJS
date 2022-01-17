function() {
		//when loading has finished,
		//execute user-given onload callback
		onloadCallback(this.xhr);
		
		--x3dom.DownloadManager.activeDownloads;
		
		x3dom.DownloadManager.tryNextDownload();
	}