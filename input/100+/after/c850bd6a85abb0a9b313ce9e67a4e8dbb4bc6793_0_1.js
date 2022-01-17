function(event) {	
	var i;		
	
	//forward refinemed attribute data by invoking the initially set callback function
	if (event.data.msg == 'refinementDone') {		
		this.refinementCallback({attributeArrayBuffers : event.data.attributeArrayBuffers});
	}
	//display error message text from worker
	else {
		x3dom.debug.logError('Error message from WebWorker context: ' + event.data);
	}
 }