function() {
  app.initialize();

  ok(app.getPath('router.store') instanceof DS.Store, "the store was injected");
}