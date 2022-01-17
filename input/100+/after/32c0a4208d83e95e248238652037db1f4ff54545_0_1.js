function(event) {
  if (event.data.msg) {
    //display message text from worker
    if (event.data.msg == 'log') {		
      x3dom.debug.logInfo('Message from WebWorker context: ' + event.data.text);
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
  }	
	else {
    //forward refined attribute data by invoking the initially set callback function  		
    this.refinementCallback(event.data);
    
    //if (++refs === 8)    
    //this.refinementCallback(event.data);
    //else
    //this.refine(event.data);
	}
 }