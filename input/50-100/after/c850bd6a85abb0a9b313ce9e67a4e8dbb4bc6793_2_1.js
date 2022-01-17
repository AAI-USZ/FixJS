function(url, onloadCallback, priority){
	this.url 	  = url;	
	this.priority = priority;
	this.xhr 	  = new XMLHttpRequest();
	
	var self = this;
	
	this.xhr.onload = function() {
		//when loading has finished,
		//execute user-given onload callback
		onloadCallback({xhr : self.xhr, url : self.url});
		
		--x3dom.DownloadManager.activeDownloads;
		
		x3dom.DownloadManager.tryNextDownload();
	};
}