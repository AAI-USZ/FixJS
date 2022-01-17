function handleBeforeScenarioEvent(event, callback) {
    var scenario = event.getPayloadItem('scenario');
    console.log('ending:',scenario.getName()); 
    callback();
  }