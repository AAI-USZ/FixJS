function() {
    var lastError;
    var model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.bind('error', function(model, error) {
      lastError = error;
    });
    var result = model.set({a: 100});
    equal(result, model);
    equal(model.get('a'), 100);
    equal(lastError, undefined);
    result = model.set({admin: true}, {silent: true});
    equal(lastError, undefined);
    equal(model.get('admin'), true);
    result = model.set({a: 200, admin: true});
    equal(result, false);
    equal(model.get('a'), 100);
    equal(lastError, "Can't change admin status.");
  }