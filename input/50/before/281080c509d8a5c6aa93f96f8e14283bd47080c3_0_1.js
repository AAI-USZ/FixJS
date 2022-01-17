function() {
  app.initialize();

  ok(app.getPath('stateManager.store') instanceof DS.Store, "the store was injected");
}