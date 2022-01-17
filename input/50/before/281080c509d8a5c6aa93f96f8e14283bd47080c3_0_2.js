function() {
  app.initialize();

  ok(app.getPath('stateManager.fooController.store') instanceof DS.Store, "the store was injected");
}