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
    equals(result, model);
    equals(model.get('a'), 100);
    equals(lastError, undefined);
    equals(boundError, undefined);
    result = model.set({a: 200, admin: true}, {error: callback});
    equals(result, false);
    equals(model.get('a'), 100);
    equals(lastError, "Can't change admin status.");
    equals(boundError, undefined);
  }