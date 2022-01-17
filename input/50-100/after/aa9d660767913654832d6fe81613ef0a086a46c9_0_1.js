function handleBeforeScenarioEvent(event, callback) {
    var scenario = event.getPayloadItem('scenario');
    console.log('starting:',scenario.getName()); 
    self.currentScenario = self.buildScenario(scenario);
    self.addScenario(self.currentScenario);
    callback();
  }