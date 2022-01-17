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
    equals(result, model);
    equals(model.get('a'), 100);
    equals(lastError, undefined);
    result = model.set({admin: true}, {silent: true});
    equals(lastError, undefined);
    equals(model.get('admin'), true);
    result = model.set({a: 200, admin: true});
    equals(result, false);
    equals(model.get('a'), 100);
    equals(lastError, "Can't change admin status.");
  }