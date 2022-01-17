function createController(options, callback) {
    controller = BrowserID.verifySecondaryAddress.create();
    options = options || {};
    options.document = doc = new WindowMock().document;
    options.redirectTimeout = 0;
    options.ready = callback;
    controller.start(options);
  }