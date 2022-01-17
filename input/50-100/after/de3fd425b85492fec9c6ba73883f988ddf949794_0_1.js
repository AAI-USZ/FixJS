function doInit() {
    try {
      populateTemplateNodes();
      Cards._init();
      App._init();
      App.showMessageViewOrSetup();
    }
    catch (ex) {
      console.error('Problem initializing', ex, '\n', ex.stack);
    }
  }