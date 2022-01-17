function handleBeforeScenarioEvent(event, callback) {
    var scenario = event.getPayloadItem('scenario');
    self.currentScenario = self.buildScenario(scenario);
    self.addScenario(self.currentScenario);
    callback();
  }