function createController(config) {
    config = _.extend({ samplingEnabled: true }, config);
    controller = BrowserID.Modules.InteractionData.create();
    controller.start(config);
  }