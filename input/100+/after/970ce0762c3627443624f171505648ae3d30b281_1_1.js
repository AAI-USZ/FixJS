function() {
    var lastError, model = new Backbone.Model();
    model.validate = function(attrs) {
      if (attrs.admin) return "Can't change admin status.";
    };
    model.sync = function(method, model, options) {
      options.success.call(this, {admin: true});
    };
    model.save(null, {error: function(model, error) {
      console.log('erroring!');
      lastError = error;
    }});

    equals(lastError, "Can't change admin status.");
  }