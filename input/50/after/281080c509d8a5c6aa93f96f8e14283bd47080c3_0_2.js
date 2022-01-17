function() {
  app.initialize();

  ok(app.getPath('router.fooController.store') instanceof DS.Store, "the store was injected");
}