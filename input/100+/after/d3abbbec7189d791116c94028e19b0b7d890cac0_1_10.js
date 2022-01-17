function() {
    var lastError, boundError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    var callback = function(model, error) {
      lastError = error;
    };
    model.bind('error', function(model, error) {
      boundError = true;
    });
    var result = model.set({a: 100}, {error: callback});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(lastError, undefined);
    equal(boundError, undefined);
    result = model.set({a: 200, admin: true}, {error: callback});
    equal(result, false);
    equal(model.get('a'), 100);
    equal(lastError, "Can't change admin status.");
    equal(boundError, undefined);
  }