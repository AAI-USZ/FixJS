function(event) {	
	//forward refined attribute data by invoking the initially set callback function
	if (event.data.msg == 'refinementDone') {		
		this.refinementCallback({attributeArrayBuffers : event.data.attributeArrayBuffers});
	}
	//@todo: debug hack
	//debug: measure time until attribute metadata has been set up inside the worker
	else if (event.data.msg == 'workerSetUp') {
		var timerDisplay = document.getElementById('workerTimerElement');
		if (timerDisplay && (typeof loadingTimer !== 'undefined')) {
			timerDisplay.textContent = 'Worker set up after ' + (event.data.timestamp - loadingTimer) + ' ms';
		}
	}
  //@todo: debug hack
	//debug: measure time worker needed for decoding
	else if (event.data.msg == 'decodeTime') {	
    console.log('Worker needed ' + event.data.time + ' ms to do the job.');
    
    if (typeof UpdateDecode !== 'undefined') {
      UpdateDecode(event.data.time);
    }
	}
	//display message text from worker
	else {
		x3dom.debug.logInfo('Message from WebWorker context: ' + event.data);
	}
 }