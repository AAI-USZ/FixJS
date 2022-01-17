function(router) {
    var properties = Ember.A(Ember.keys(this)),
        injections = get(this.constructor, 'injections'),
        namespace = this, controller, name;

    if (!router && Ember.Router.detect(namespace['Router'])) {
      router = namespace['Router'].create();
      this._createdRouter = router;
    }

    if (router) {
      set(this, 'stateManager', router);

      // By default, the router's namespace is the current application.
      //
      // This allows it to find model classes when a state has a
      // route like `/posts/:post_id`. In that case, it would first
      // convert `post_id` into `Post`, and then look it up on its
      // namespace.
      set(router, 'namespace', this);
    }

    Ember.runLoadHooks('application', this);

    injections.forEach(function(injection) {
      properties.forEach(function(property) {
        injection[1](namespace, router, property);
      });
    });

    if (router && router instanceof Ember.Router) {
      this.startRouting(router);
    }
  }