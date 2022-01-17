function createController(options, callback) {
    controller = BrowserID.verifySecondaryAddress.create();
    // defaults, but options can override
    options = _.extend({
      document: new WindowMock().document,
      redirectTimeout: 0,
      ready: callback
    }, options || {});
    doc = options.document;
    controller.start(options);
  }