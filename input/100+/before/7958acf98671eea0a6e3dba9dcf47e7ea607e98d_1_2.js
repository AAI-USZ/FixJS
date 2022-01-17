function() {
	var firstRequest;
	var i;
		
	//if there are less then maxDownloads running, start a new one,
	//otherwise do nothing
	if (this.activeDownloads < this.maxDownloads) {	
		//remove first queue element, if any
		for (i = 0; i < this.requests.length; ++i) {
			//find the request queue with the highest priority
			if (this.requests[i] && this.requests[i].length > 0){
				//remove first request from the queue
				firstRequest = this.requests[i].shift();
				break;
			}
		}
		
		if (firstRequest) {
			firstRequest.send();
			
			++this.activeDownloads;
		}
	}
}